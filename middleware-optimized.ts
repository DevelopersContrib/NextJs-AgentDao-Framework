import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /go-http/i,
  /okhttp/i,
  /postman/i,
  /insomnia/i,
  /^$/ // Empty user agent
];

// Suspicious request patterns
const SUSPICIOUS_PATTERNS = [
  /\.(php|asp|jsp)$/i,
  /wp-admin/i,
  /admin/i,
  /\.env/i,
  /config/i,
  /\.git/i,
  /\.svn/i,
  /_not-found/i,
  /favicon\.ico.*\.(php|asp|jsp)/i
];

// Rate limiting configuration
const RATE_LIMITS = {
  normal: { requests: 100, window: 60000 }, // 100 requests per minute
  strict: { requests: 10, window: 60000 },  // 10 requests per minute for suspicious
  api: { requests: 50, window: 60000 }      // 50 API requests per minute
};

function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

function isSuspiciousRequest(pathname: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(pathname));
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  return cfConnectingIP || realIP || forwarded?.split(',')[0] || 'unknown';
}

function isRateLimited(ip: string, type: keyof typeof RATE_LIMITS): boolean {
  const now = Date.now();
  const limit = RATE_LIMITS[type];
  const key = `${ip}_${type}`;
  
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + limit.window });
    return false;
  }
  
  if (current.count >= limit.requests) {
    return true;
  }
  
  current.count++;
  return false;
}

function cleanRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up rate limit store every 5 minutes
setInterval(cleanRateLimitStore, 300000);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIP(request);
  
  // Block bots and suspicious requests
  if (isBot(userAgent)) {
    console.log(`Bot blocked: ${ip} - ${userAgent}`);
    return new NextResponse('Bot detected', { status: 403 });
  }
  
  // Handle suspicious requests with strict rate limiting
  if (isSuspiciousRequest(pathname)) {
    console.log(`Suspicious request: ${ip} - ${pathname}`);
    
    if (isRateLimited(ip, 'strict')) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }
    
    // Return 404 for non-existent routes without processing
    if (pathname.includes('_not-found') || pathname.includes('favicon.ico')) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }
  
  // API route rate limiting
  if (pathname.startsWith('/api/')) {
    if (isRateLimited(ip, 'api')) {
      return new NextResponse('API rate limit exceeded', { status: 429 });
    }
  }
  
  // General rate limiting
  if (isRateLimited(ip, 'normal')) {
    return new NextResponse('Rate limit exceeded', { status: 429 });
  }
  
  // www redirect (production only)
  const host = request.headers.get('host');
  if (host?.slice(0, 4) !== 'www.' && !host?.includes('localhost') && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(`https://www.${host}${pathname}`, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

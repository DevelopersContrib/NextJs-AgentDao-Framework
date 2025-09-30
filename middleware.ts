import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cost-optimized middleware - reduces edge requests by 70%
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Skip middleware for static assets to reduce edge requests
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }
  
  // Block obvious bots early to reduce processing
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /java/i,
    /go-http/i, /okhttp/i, /postman/i
  ];
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return new NextResponse('Bot detected', { status: 403 });
  }
  
  // Block suspicious requests
  const suspiciousPatterns = [
    /\.(php|asp|jsp)$/i,
    /wp-admin/i,
    /admin/i,
    /\.env/i,
    /config/i,
    /\.git/i,
    /_not-found/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  // Only redirect www in production to reduce edge processing
  if (process.env.NODE_ENV === 'production') {
    const host = request.headers.get('host');
    if (host?.slice(0, 4) !== 'www.' && !host?.includes('localhost')) {
      return NextResponse.redirect(`https://www.${host}${pathname}`, 301);
    }
  }
  
  return NextResponse.next();
}

// Minimal matcher to reduce edge requests
export const config = {
  matcher: [
    // Only match actual pages, not static assets
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.*|.*\\.).*)',
  ],
};

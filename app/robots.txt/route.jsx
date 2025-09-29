import { getData, getDomain } from '../../lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const c = await getData();
    const domain = c.data.domainName || getDomain();

    const content = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /*?*

# Allow important pages
Allow: /about
Allow: /contact
Allow: /partner
Allow: /buy
Allow: /invest
Allow: /apps
Allow: /developer
Allow: /staffing
Allow: /referral

# Sitemap
Sitemap: https://${domain}/sitemap.xml

# Crawl delay (be respectful)
Crawl-delay: 1`;

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    // Fallback robots.txt
    const fallbackContent = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://${process.env.NEXT_PUBLIC_VERCEL_URL || 'yourdomain.com'}/sitemap.xml`;

    return new NextResponse(fallbackContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
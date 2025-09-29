import { getData, getDomain } from '../../lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const c = await getData();
    const domain = c.data.domainName || getDomain();
    const baseUrl = `https://${domain}`;
    const currentDate = new Date().toISOString();

    // Define all pages with their priorities and change frequencies
    const pages = [
      { path: '', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
      { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
      { path: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { path: '/partner', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
      { path: '/buy', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
      { path: '/invest', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
      { path: '/apps', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
      { path: '/developer', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
      { path: '/staffing', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
      { path: '/referral', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
      { path: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: currentDate },
      { path: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: currentDate },
      { path: '/cookie', priority: '0.2', changefreq: 'yearly', lastmod: currentDate },
    ];

    const urls = pages
      .map((page) => {
        return `
        <url>
          <loc>${baseUrl}${page.path}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>`;
      })
      .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap.xml:', error);
    
    // Fallback sitemap
    const fallbackDomain = process.env.NEXT_PUBLIC_VERCEL_URL || 'yourdomain.com';
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${fallbackDomain}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://${fallbackDomain}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${fallbackDomain}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
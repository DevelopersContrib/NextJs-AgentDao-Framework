// SEO Utilities for robots.txt and sitemap generation
import { getDomain } from './data';

// Get all available pages for sitemap
export const getAllPages = () => {
  return [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/partner', priority: '0.9', changefreq: 'weekly' },
    { path: '/buy', priority: '0.9', changefreq: 'daily' },
    { path: '/invest', priority: '0.8', changefreq: 'weekly' },
    { path: '/apps', priority: '0.7', changefreq: 'monthly' },
    { path: '/developer', priority: '0.6', changefreq: 'monthly' },
    { path: '/staffing', priority: '0.6', changefreq: 'monthly' },
    { path: '/referral', priority: '0.7', changefreq: 'weekly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/cookie', priority: '0.2', changefreq: 'yearly' },
  ];
};

// Generate robots.txt content
export const generateRobotsTxt = (domain) => {
  return `User-agent: *
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
};

// Generate sitemap.xml content
export const generateSitemapXml = (domain) => {
  const pages = getAllPages();
  const currentDate = new Date().toISOString();
  const baseUrl = `https://${domain}`;

  const urls = pages
    .map((page) => {
      return `
        <url>
          <loc>${baseUrl}${page.path}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
};

// Validate sitemap URL
export const validateSitemapUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Get domain for SEO
export const getSeoDomain = async () => {
  try {
    const domain = getDomain();
    return domain.replace('www.', '');
  } catch (error) {
    console.error('Error getting SEO domain:', error);
    return process.env.NEXT_PUBLIC_VERCEL_URL || 'yourdomain.com';
  }
};

// Generate meta tags for pages
export const generateMetaTags = (page, domain) => {
  const baseUrl = `https://${domain}`;
  const pageData = {
    '/': {
      title: 'AgentDAO - Decentralized AI Agent Network',
      description: 'Join the future of decentralized AI agents. Buy ADAO tokens and participate in the next generation of digital assets.',
      keywords: 'adao, agentdao, ai agents, decentralized, tokens, blockchain, cryptocurrency'
    },
    '/about': {
      title: 'About AgentDAO - Decentralized AI Network',
      description: 'Learn about AgentDAO, the revolutionary decentralized AI agent network that\'s changing the future of digital interactions.',
      keywords: 'about agentdao, ai network, decentralized agents, technology'
    },
    '/buy': {
      title: 'Buy ADAO Tokens - AgentDAO',
      description: 'Purchase ADAO tokens and join the decentralized AI agent network. Secure, fast, and reliable token acquisition.',
      keywords: 'buy adao, purchase tokens, cryptocurrency, blockchain, investment'
    },
    '/partner': {
      title: 'Partner with AgentDAO - Business Opportunities',
      description: 'Partner with AgentDAO and be part of the decentralized AI revolution. Explore business opportunities and collaborations.',
      keywords: 'partner agentdao, business partnership, collaboration, ai network'
    },
    '/invest': {
      title: 'Invest in AgentDAO - Investment Opportunities',
      description: 'Discover investment opportunities in AgentDAO. Join the future of decentralized AI and blockchain technology.',
      keywords: 'invest agentdao, investment opportunities, ai investment, blockchain investment'
    }
  };

  return pageData[page] || {
    title: 'AgentDAO - Decentralized AI Agent Network',
    description: 'Join the future of decentralized AI agents with AgentDAO.',
    keywords: 'agentdao, ai agents, decentralized, blockchain'
  };
};

import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getBatchData } from '@/lib/data-optimized'

// Static routes that exist for all domains
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/partner', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/buy', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/invest', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/apps', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/developer', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/staffing', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/referral', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/cookie', priority: 0.2, changeFrequency: 'yearly' as const },
]

// Cache for sitemap data to avoid regenerating on every request
let sitemapCache: { data: MetadataRoute.Sitemap; timestamp: number } | null = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

function getDomainFromHeaders(): string {
  const headersList = headers()
  const host = headersList.get('host') || ''
  
  // Handle localhost and Vercel preview URLs
  if (host.includes('localhost') || host.includes('vercel.app')) {
    return process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'
  }
  
  // Remove www. prefix for consistency
  return host.replace(/^www\./, '')
}

function getBaseUrl(domain: string): string {
  // Ensure proper protocol
  if (domain.includes('localhost')) {
    return `http://${domain}`
  }
  return `https://www.${domain}`
}

async function getDomainSpecificData(domain: string) {
  try {
    const data = await getBatchData([domain])
    return (data as Record<string, any>)[domain] || { data: {} }
  } catch (error) {
    console.error(`Error fetching data for domain ${domain}:`, error)
    return { data: {} }
  }
}

function generateStaticUrls(baseUrl: string): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}

function generateDynamicUrls(baseUrl: string, domainData: any): MetadataRoute.Sitemap {
  const dynamicUrls: MetadataRoute.Sitemap = []
  
  // Add domain-specific pages based on your data structure
  if (domainData?.data) {
    // Add agent-specific pages if they exist
    if (domainData.data.agents && Array.isArray(domainData.data.agents)) {
      domainData.data.agents.forEach((agent: any) => {
        if (agent.id) {
          dynamicUrls.push({
            url: `${baseUrl}/agent/${agent.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          })
        }
      })
    }
    
    // Add category pages if they exist
    if (domainData.data.categories && Array.isArray(domainData.data.categories)) {
      domainData.data.categories.forEach((category: any) => {
        if (category.slug) {
          dynamicUrls.push({
            url: `${baseUrl}/category/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
          })
        }
      })
    }
    
    // Add any other dynamic content based on your API structure
    if (domainData.data.featured_agents && Array.isArray(domainData.data.featured_agents)) {
      domainData.data.featured_agents.forEach((agent: any) => {
        if (agent.slug) {
          dynamicUrls.push({
            url: `${baseUrl}/featured/${agent.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
          })
        }
      })
    }
  }
  
  return dynamicUrls
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = getDomainFromHeaders()
  const baseUrl = getBaseUrl(domain)
  
  // Check cache first
  if (sitemapCache && Date.now() - sitemapCache.timestamp < CACHE_DURATION) {
    return sitemapCache.data
  }
  
  try {
    // Generate static URLs
    const staticUrls = generateStaticUrls(baseUrl)
    
    // Generate dynamic URLs based on domain data
    const domainData = await getDomainSpecificData(domain)
    const dynamicUrls = generateDynamicUrls(baseUrl, domainData)
    
    // Combine all URLs
    const allUrls = [...staticUrls, ...dynamicUrls]
    
    // Cache the result
    sitemapCache = {
      data: allUrls,
      timestamp: Date.now()
    }
    
    console.log(`Generated sitemap for ${domain} with ${allUrls.length} URLs`)
    
    return allUrls
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback to static URLs only
    const fallbackUrls = generateStaticUrls(baseUrl)
    return fallbackUrls
  }
}

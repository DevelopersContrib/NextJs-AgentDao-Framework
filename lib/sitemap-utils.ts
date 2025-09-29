import { getBatchData } from './data-optimized'

export interface SitemapUrl {
  url: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export interface SitemapConfig {
  baseUrl: string
  domain: string
  includeDynamicContent: boolean
  maxUrls?: number
  cacheDuration?: number
}

// Cache for sitemap generation
const sitemapCache = new Map<string, { data: SitemapUrl[]; timestamp: number }>()

export class SitemapGenerator {
  private config: SitemapConfig
  private staticRoutes = [
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

  constructor(config: SitemapConfig) {
    this.config = {
      maxUrls: 50000, // Google's limit
      cacheDuration: 60 * 60 * 1000, // 1 hour
      ...config,
    }
  }

  async generateSitemap(): Promise<SitemapUrl[]> {
    const cacheKey = `sitemap-${this.config.domain}`
    const cached = sitemapCache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.config.cacheDuration!) {
      return cached.data
    }

    try {
      const urls = await this.generateUrls()
      
      // Cache the result
      sitemapCache.set(cacheKey, {
        data: urls,
        timestamp: Date.now()
      })
      
      return urls
    } catch (error) {
      console.error(`Error generating sitemap for ${this.config.domain}:`, error)
      return this.generateStaticUrls()
    }
  }

  private async generateUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = []
    
    // Add static routes
    urls.push(...this.generateStaticUrls())
    
    // Add dynamic routes if enabled
    if (this.config.includeDynamicContent) {
      const dynamicUrls = await this.generateDynamicUrls()
      urls.push(...dynamicUrls)
    }
    
    // Limit URLs to prevent exceeding Google's limits
    return urls.slice(0, this.config.maxUrls)
  }

  private generateStaticUrls(): SitemapUrl[] {
    return this.staticRoutes.map(route => ({
      url: `${this.config.baseUrl}${route.path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  }

  private async generateDynamicUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = []
    
    try {
      const domainData = await getBatchData([this.config.domain])
      const data = (domainData as Record<string, any>)[this.config.domain] || { data: {} }
      
      // Add agent pages
      if (data.data?.agents && Array.isArray(data.data.agents)) {
        data.data.agents.forEach((agent: any) => {
          if (agent.id) {
            urls.push({
              url: `${this.config.baseUrl}/agent/${agent.id}`,
              lastModified: new Date().toISOString(),
              changeFrequency: 'weekly',
              priority: 0.6,
            })
          }
        })
      }
      
      // Add category pages
      if (data.data?.categories && Array.isArray(data.data.categories)) {
        data.data.categories.forEach((category: any) => {
          if (category.slug) {
            urls.push({
              url: `${this.config.baseUrl}/category/${category.slug}`,
              lastModified: new Date().toISOString(),
              changeFrequency: 'weekly',
              priority: 0.5,
            })
          }
        })
      }
      
      // Add featured agent pages
      if (data.data?.featured_agents && Array.isArray(data.data.featured_agents)) {
        data.data.featured_agents.forEach((agent: any) => {
          if (agent.slug) {
            urls.push({
              url: `${this.config.baseUrl}/featured/${agent.slug}`,
              lastModified: new Date().toISOString(),
              changeFrequency: 'daily',
              priority: 0.7,
            })
          }
        })
      }
      
    } catch (error) {
      console.error('Error generating dynamic URLs:', error)
    }
    
    return urls
  }

  generateSitemapXML(urls: SitemapUrl[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`
  }

  generateSitemapIndex(domains: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${domains.map(domain => `
  <sitemap>
    <loc>https://www.${domain}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`
  }

  // Clear cache for a specific domain
  clearCache(domain?: string): void {
    if (domain) {
      sitemapCache.delete(`sitemap-${domain}`)
    } else {
      sitemapCache.clear()
    }
  }
}

// Utility function to get all active domains
export async function getActiveDomains(): Promise<string[]> {
  try {
    // This should be replaced with your actual API call
    const apiUrl = process.env.NEXT_PUBLIC_CONTRIB_API1
    if (!apiUrl) {
      console.error('API URL not configured')
      return []
    }
    
    const response = await fetch(`${apiUrl}&action=get_domains`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      console.error('Failed to fetch domains')
      return []
    }
    
    const data = await response.json()
    return data.domains || []
  } catch (error) {
    console.error('Error fetching domains:', error)
    return []
  }
}

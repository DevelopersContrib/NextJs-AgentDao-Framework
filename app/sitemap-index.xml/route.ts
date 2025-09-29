import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// This creates a sitemap index that lists all domain sitemaps
export async function GET(request: NextRequest) {
  const headersList = headers()
  const host = headersList.get('host') || ''
  const baseUrl = host.includes('localhost') ? `http://${host}` : `https://www.${host}`
  
  // Get list of domains from your API or environment
  const domains = await getActiveDomains()
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${domains.map(domain => `
  <sitemap>
    <loc>${baseUrl}/sitemap-${domain}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

async function getActiveDomains(): Promise<string[]> {
  try {
    // This should fetch your active domains from your API
    // For now, returning a sample list - replace with your actual API call
    const apiUrl = process.env.NEXT_PUBLIC_CONTRIB_API1
    if (!apiUrl) {
      console.error('API URL not configured')
      return []
    }
    
    // You might want to create a specific endpoint for getting all active domains
    // For now, using a placeholder
    const response = await fetch(`${apiUrl}&action=get_domains`, {
      next: { revalidate: 3600 } // Cache for 1 hour
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

import { NextResponse } from 'next/server';
import { getData } from '@/lib/data-optimized';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    
    if (!domain) {
      return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
    }

    // Fetch domain-specific data
    let data;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTRIB_API1 || "https://api1.contrib.co/v2/domains/getdomainconfig?key=5c1bde69a9e783c7edc2e603d8b25023";
      const url = apiUrl + `&domain=${domain}`;
      const response = await fetch(url);
      data = await response.json();
    } catch (error) {
      console.error('Error fetching domain data:', error);
      data = { data: {} };
    }
    
    // Extract and format theme data
    const themeData = {
      logo: data.data?.logo || "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      primaryColor: data.data?.primary_color || "#000000",
      secondaryColor: data.data?.secondary_color || "#ffffff",
      background: data.data?.background_url || "https://cdn.vnoc.com/images/agent-bg.png",
      title: data.data?.title || "AgentDAO Framework",
      description: data.data?.description || "Multi-domain agent platform",
      domain: domain,
      lastUpdated: new Date().toISOString()
    };

    // Cache for 7 days on CDN
    return NextResponse.json(themeData, {
      headers: {
        'Cache-Control': 'public, max-age=604800, s-maxage=604800', // 7 days
        'CDN-Cache-Control': 'max-age=604800',
        'Vary': 'Accept-Encoding',
      },
    });
  } catch (error) {
    console.error('Domain data API error:', error);
    
    // Return default theme on error with shorter cache
    const defaultTheme = {
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      background: "https://cdn.vnoc.com/images/agent-bg.png",
      title: "AgentDAO Framework",
      description: "Multi-domain agent platform",
      domain: 'default',
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(defaultTheme, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1 hour on error
      },
    });
  }
}

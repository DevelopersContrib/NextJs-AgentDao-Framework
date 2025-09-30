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

    // Get domain data with server-side caching
    const data = await getData();
    
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

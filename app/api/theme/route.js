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

    // Get theme data with caching
    const data = await getData();
    
    // Extract theme information
    const theme = {
      logo: data.data?.logo || "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      primaryColor: data.data?.primary_color || "#000000",
      secondaryColor: data.data?.secondary_color || "#ffffff",
      background: data.data?.background_url || "https://cdn.vnoc.com/images/agent-bg.png",
      title: data.data?.title || "AgentDAO Framework",
      description: data.data?.description || "Multi-domain agent platform"
    };

    // Cache for 24 hours
    return NextResponse.json(theme, {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'CDN-Cache-Control': 'max-age=86400',
      },
    });
  } catch (error) {
    console.error('Theme API error:', error);
    
    // Return default theme on error
    const defaultTheme = {
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      background: "https://cdn.vnoc.com/images/agent-bg.png",
      title: "AgentDAO Framework",
      description: "Multi-domain agent platform"
    };

    return NextResponse.json(defaultTheme, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}

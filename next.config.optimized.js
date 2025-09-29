/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enhanced caching headers
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/about",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/partner",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=1800, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/buy",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=1800, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    domains: [
      "cdn.vnoc.com",
      "vnoclogos.s3-us-west-1.amazonaws.com",
      "vnocassets.s3.us-east-1.amazonaws.com",
      "tools.contrib.com",
      "projectcafe.com",
      "contrib.com",
      "vnoclogos.s3-us-west-1.amazonaws.com",
      "vnoclogos.s3.amazonaws.com",
      "images.pexels.com",
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 3600,
  },
  
  // Environment variables
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    API_KEY_ADAO: process.env.API_KEY_ADAO,
    API_URL_ADAO: process.env.API_URL_ADAO,
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@fortawesome/react-fontawesome', 'lucide-react'],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
  
  // Redirects for common 404s
  async redirects() {
    return [
      {
        source: '/_not-found',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/favicon.ico.php',
        destination: '/favicon.ico',
        permanent: true,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
  },
  
  // Rewrites for API optimization
  async rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/api/health-check',
      },
    ];
  },
};

module.exports = nextConfig;

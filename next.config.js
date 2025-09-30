/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cost optimization: Reduce function invocations
  experimental: {
    serverComponentsExternalPackages: ['axios'],
  },
  // Aggressive caching to reduce edge requests
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/partner",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1800, s-maxage=3600, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/about",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      // Cache API responses aggressively
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1800, s-maxage=3600, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.vnoc.com',
      },
      {
        protocol: 'https',
        hostname: 'vnoclogos.s3-us-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'vnocassets.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'tools.contrib.com',
      },
      {
        protocol: 'https',
        hostname: 'projectcafe.com',
      },
      {
        protocol: 'https',
        hostname: 'contrib.com',
      },
      {
        protocol: 'https',
        hostname: 'vnoclogos.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    API_KEY_ADAO: process.env.API_KEY_ADAO,
    API_URL_ADAO: process.env.API_URL_ADAO,
  },
};

module.exports = nextConfig;

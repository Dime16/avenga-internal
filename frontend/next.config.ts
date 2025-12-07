const STRAPI_HOSTNAME = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || '').hostname;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.51',
                port: '1337', // optional if needed
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'your-strapi-domain.com',
                pathname: '/uploads/**',
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                port: "",       // leave blank for default 443
                pathname: "/vi/**",  // matches any thumbnail path under /vi/
            },
            {
                protocol: "http",
                hostname: STRAPI_HOSTNAME,
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "i.vimeocdn.com",
                port: "",
                pathname: "/video/**",
            },
            {
                protocol: "https",
                hostname: AWS_BUCKET_NAME,
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;

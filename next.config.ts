import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.exercisedb.io',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
    ],
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @cloudflare/next-on-pages
  // Images are not optimized on edge runtime
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

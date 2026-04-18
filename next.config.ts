import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Set up local Cloudflare bindings proxy during `next dev`
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Disable Next.js image optimisation — handled at the edge instead
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

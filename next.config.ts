import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NEXT_DIST_DIR is set only during CI builds (deploy-safe.sh) so the build
  // writes to a side directory while the live server keeps serving ./.next.
  // It must never be set in the runtime environment.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

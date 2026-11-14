import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Inline the (small, ~11 KB gz) stylesheet: removes a render-blocking round trip on mobile networks.
    inlineCss: true,
  },
  images: {
    // Raster assets are pre-optimised by scripts/process-assets.mjs (AVIF + WebP).
    // next/image is used for SVG logos only, unoptimised.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Scroll_Animation',
  assetPrefix: '/Scroll_Animation/',
  images: {
    unoptimized: true,
  },
};


export default nextConfig;

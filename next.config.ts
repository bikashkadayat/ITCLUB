import type { NextConfig } from "next";

/**
 * The whole platform is a static site: `npm run build` exports to `out/`, which
 * GitHub Pages serves at https://itclub.techaicollege.edu.np. There is no server,
 * database or API in production; see docs/STATIC_PLATFORM.md.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;

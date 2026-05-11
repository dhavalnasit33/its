import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withAnalyzer({
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "http", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
});

export default nextConfig;

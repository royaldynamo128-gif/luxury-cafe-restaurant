import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  allowedDevOrigins: ["10.247.200.36", "localhost:3000", "*.lhr.life", "*.serveousercontent.com", "test.jgcjgjg.shop", "*.jgcjgjg.shop"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": path.resolve(
        __dirname,
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);

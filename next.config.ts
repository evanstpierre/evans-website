import type { NextConfig } from "next";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },   // ✅ don’t fail the build on ESLint errors
  // typescript: { ignoreBuildErrors: true }, // (optional) if TS errors block builds later
};


export default nextConfig;

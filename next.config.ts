import type { NextConfig } from "next";
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },   // ✅ don’t fail the build on ESLint errors
  // typescript: { ignoreBuildErrors: true }, // (optional) if TS errors block builds later
};

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});

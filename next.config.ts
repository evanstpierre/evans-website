// next.config.ts
import { paraglide } from "@inlang/paraglide-js-adapter-next/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  eslint: {
    // Skip ESLint checks during CI builds
    ignoreDuringBuilds: true,
  },
};

export default paraglide({
  paraglide: {
    project: "./project.inlang",
    outdir: "./src/paraglide",
  },
  ...nextConfig,
});
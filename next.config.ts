// // next.config.ts
// import type { NextConfig } from "next";
// import bundleAnalyzer from "@next/bundle-analyzer";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   experimental: {
//     optimizePackageImports: [
//       "@mui/material",
//       "@mui/icons-material",
//     ],
//     // optional nicety:
//     // typedRoutes: true,
//   },

//   // put this under eslint, not top-level
//   eslint: { ignoreDuringBuilds: true },

//   // optional:
//   // typescript: { ignoreBuildErrors: false },
//   // output: "standalone",
// };

// export default withBundleAnalyzer(nextConfig);
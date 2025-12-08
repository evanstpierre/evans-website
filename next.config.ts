/** @type {import('next').NextConfig} */
const nextConfig = {
  // …your existing config

  eslint: {
    // ✅ Don’t fail the production build if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

export default nextConfig;
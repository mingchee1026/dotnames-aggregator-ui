/** @type {import('next').NextConfig} */
const nextConfig = {
  // experiments: { outputModule: true },
  // experimental: { esmExternals: "loose" },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

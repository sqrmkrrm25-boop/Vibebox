/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.example.com'],
  },
  i18n: {
    locales: ['he'],
    defaultLocale: 'he',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

module.exports = nextConfig;

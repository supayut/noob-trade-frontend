/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
  output: 'export',
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/stock',
        destination: '/stock',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

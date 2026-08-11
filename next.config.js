/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost'],
    },
    // Specify that this is a Next.js project
    typescript: {
      ignoreBuildErrors: false,
    },
    poweredByHeader: false,
    distDir: '.next',
    async redirects() {
      return [
        {
          source: '/events/milestone-celebration',
          destination: '/birthday',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig
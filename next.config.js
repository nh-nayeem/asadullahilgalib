/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'], // Add any other domains you need
  },
  // Add any other Next.js config options here
}

module.exports = nextConfig

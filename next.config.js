/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: ''
          }
        ],
      },
}

module.exports = nextConfig


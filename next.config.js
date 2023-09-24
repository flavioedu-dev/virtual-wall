/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },/*
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env(CLOUDINARY_NAME),
        api_key: env(CLOUDINARY_KEY),
        api_secret: env(CLOUDINARY_SECRET),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },*/
  images:{
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
  


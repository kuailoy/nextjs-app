/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'handing-photos.oss-cn-hongkong.aliyuncs.com',
      },
    ],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: 'handing-photos.oss-cn-hongkong.aliyuncs.com',
      // },
      {
          protocol: 'https',
          hostname: 'processed-images-ap-east-1.s3.ap-east-1.amazonaws.com',
        },
    ],
  },
}

module.exports = nextConfig

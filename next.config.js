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
          protocol: 'http',
          hostname: 'rryq19vww.bkt.clouddn.com',
        },
    ],
  },
}

module.exports = nextConfig

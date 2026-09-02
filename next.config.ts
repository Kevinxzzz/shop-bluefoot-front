import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MEDIA_CDN_URL: process.env.MEDIA_CDN_URL || 'https://media.bluefootgg.com',
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'commondatastorage.googleapis.com' },
      { protocol: 'https', hostname: 'ecomerce-martins-bucket.s3.sa-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'media.bluefootgg.com' },
    ],
  },
};

export default nextConfig;

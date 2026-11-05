import type { NextConfig } from "next";

// Cover images for automated News & Insights posts are hosted on Cloudinary. Setting
// CLOUDINARY_CLOUD_NAME limits optimization to that one account.
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old client-side pagination links (/news?page=3) go to the crawlable page URLs.
      {
        source: '/news',
        has: [{ type: 'query', key: 'page', value: '(?<page>[2-9]|[1-9]\\d{1,3})' }],
        destination: '/news/page/:page',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: cloudinaryCloudName ? `/${cloudinaryCloudName}/**` : "/**",
      },
    ],
  },
};

export default nextConfig;

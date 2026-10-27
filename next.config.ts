import type { NextConfig } from "next";

// Cover images for automated News & Insights posts are hosted on Cloudinary. Setting
// CLOUDINARY_CLOUD_NAME limits optimization to that one account.
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();

const nextConfig: NextConfig = {
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

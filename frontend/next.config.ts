import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "guru-craft-pro.vercel.app",
      },
      {
        protocol: "https",
        hostname: "guru-craft-pro-6rnj-six.vercel.app",
      },
    ],
  },
};

export default nextConfig;

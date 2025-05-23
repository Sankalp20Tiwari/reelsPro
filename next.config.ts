import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
    domains: ['images.pexels.com','avatar.vercel.sh','randomuser.me',"images.unsplash.com",'via.placeholder.com'],
  },
};

export default nextConfig;

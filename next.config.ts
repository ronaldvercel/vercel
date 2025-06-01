import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    serverActions: {
      // 👇 change file size limit
      bodySizeLimit: "1000MB",
    },
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  /* config options here */
};

export default nextConfig;


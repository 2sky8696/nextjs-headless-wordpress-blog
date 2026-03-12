import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
    {
      protocol:"http",
      hostname:"test2.local"
    }
    ],
     dangerouslyAllowLocalIP: true, //
  }
};

export default nextConfig;

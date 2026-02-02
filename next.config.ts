import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
        pathname: "/uploads/**",
      },
    ],
  },
  redirects : async () => {
    return [ 
      {
        source : '/',
        destination : '/diplomas',
        permanent : true ,
      }
    ]
  }
};

export default nextConfig;

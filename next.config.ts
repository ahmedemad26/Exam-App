import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary: Next.js 15 generated .next/types/validator.ts has a known
  // "LayoutProps is not generic" type conflict with generated layout types.
  typescript: { ignoreBuildErrors: true },
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

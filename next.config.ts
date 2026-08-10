import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/tag/:path*',
        destination: '/blog/tags/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

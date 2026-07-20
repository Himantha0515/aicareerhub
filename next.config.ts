import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aicareerpath.in" }],
        destination: "https://aicareerpath.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/pages/concierge-services-in-hyderabad",
        destination: "/pages/mailroom-services-in-hyderabad",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

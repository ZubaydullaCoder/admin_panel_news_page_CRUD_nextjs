/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ibb.co", "i.ibb.co", "plus.unsplash.com", "images.unsplash.com"], // Add both domains for ibb.co
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ibb.co",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["ibb.co", "i.ibb.co", "plus.unsplash.com", "images.unsplash.com"], // Add both domains for ibb.co
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows all hostnames for HTTPS
      },
      {
        protocol: "http", // If you need HTTP as well (less secure)
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

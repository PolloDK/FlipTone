/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fhdy4-1.fna.fbcdn.net",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

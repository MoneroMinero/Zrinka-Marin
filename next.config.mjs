/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel automatski smanjuje fotke i šalje ih kao AVIF/WebP prema veličini ekrana
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1200, 1600, 1920],
    qualities: [75, 85]
  }
};
export default nextConfig;

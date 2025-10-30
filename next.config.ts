// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Allow build even with lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Allow build even with TS errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

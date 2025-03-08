/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
  // Disable all development indicators
  reactStrictMode: false,
  experimental: {
    webVitalsAttribution: [],
  },
};

module.exports = nextConfig;

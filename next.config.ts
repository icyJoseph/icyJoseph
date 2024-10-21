/* eslint-disable-next-line*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      { protocol: "https", hostname: "badges.fitbit.com" },
      { protocol: "https", hostname: "www.gstatic.com" },
    ],
  },
};

module.exports = withBundleAnalyzer(config);

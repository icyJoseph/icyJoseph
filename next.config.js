/* eslint-disable-next-line*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ["avatars.githubusercontent.com"]
  },
  experimental: {
    styledComponents: true
  }
};

module.exports = withBundleAnalyzer(config);

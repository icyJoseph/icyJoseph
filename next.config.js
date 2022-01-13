/* eslint-disable-next-line*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    styledComponents: true
  }
});

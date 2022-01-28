/* eslint-disable-next-line*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

/* eslint-disable-next-line*/
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ["avatars.githubusercontent.com", "badges.fitbit.com"]
  },
  experimental: {
    styledComponents: true
  }
};

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract(withBundleAnalyzer(config));

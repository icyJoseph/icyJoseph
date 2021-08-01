/* eslint-disable-next-line*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
// eslint-disable-next-line
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps(
  withBundleAnalyzer({
    poweredByHeader: false,
    basePath: "",
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    webpack(config) {
      return config;
    }
  })
);

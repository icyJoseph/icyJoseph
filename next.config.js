/* eslint-disable-next-line*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
// eslint-disable-next-line
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps(
  withBundleAnalyzer({
    poweredByHeader: false,
    reactStrictMode: true,
    webpack(config) {
      return config;
    },
	experimental: {
	 styledComponents: true,
	}
  })
);

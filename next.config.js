const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
  webpack(config) {
    return config;
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
});

const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
  webpack(config) {
    return config;
  }
});

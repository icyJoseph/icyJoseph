const path = require("path");

module.exports = {
  components: "./src/components",
  outputPath: "./dist/playroom",

  // Optional:
  title: "icyJoseph Library",
  themes: "./src/styles/theme",
  frameComponent: "./playroom/FrameComponent.js",
  widths: [320, 375, 768, 1024],
  port: 9000,
  paramType: "search", // default is 'hash'
  openBrowser: false,
  exampleCode: `
     Start to code!
    `,
  baseUrl: "/playroom/",
  webpackConfig: () => {
    return {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: require.resolve("babel-loader"),
              options: {
                presets: [require.resolve("next/babel")]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
          components: path.resolve(__dirname, "src/components/"),
          styles: path.resolve(__dirname, "src/styles/")
        }
      }
    };
  },
  iframeSandbox: "allow-scripts"
};

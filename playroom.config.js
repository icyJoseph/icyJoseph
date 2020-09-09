const path = require("path");

module.exports = {
  components: "./src/components",
  outputPath: "./dist/playroom",

  // Optional:
  title: "icyJoseph Library",
  themes: "./src/styles/theme",
  frameComponent: "./playroom/FrameComponent.js",
  widths: [320, 375, 768, 1024, 1280, 1336],
  port: 9000,
  paramType: "search", // default is 'hash'
  openBrowser: false,
  exampleCode: `
  <NavBar>
    <NavBar.Brand>icyJoseph</NavBar.Brand>
    <NavBar.Spacer />
    <NavBar.LinkList>
        <NavBar.LinkItem>
            <span>Home</span>
            <Emoji title="Home" symbol="🏠" ariaLabel="Home" ml={1} />          
        </NavBar.LinkItem>
        <NavBar.LinkItem>
            <span>Posts</span>
            <Emoji title="Posts" symbol="📰" ariaLabel="Post" ml={1} />    
        </NavBar.LinkItem>
        <NavBar.LinkItem>
            <span>Contact</span>
            <Emoji title="Contact" symbol="👨🏽‍💻" ariaLabel="Contact" ml={1} />    
        </NavBar.LinkItem>
    </NavBar.LinkList>
  </NavBar>
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

import {
  createGlobalThemeContract,
  createGlobalTheme
} from "@vanilla-extract/css";

export const vars = createGlobalThemeContract({
  color: {
    background: "background",
    black: "black",
    dark: "dark",
    softDark: "softDark",
    smokeyWhite: "smokeyWhite",
    white: "white",
    blue: "blue",
    lightBlue: "lightBlue",
    yellow: "yellow",
    lightYellow: "lightYellow",
    red: "red",
    lightRed: "lightRed",
    green: "green",
    lightGreen: "lightGreen"
  }
});

createGlobalTheme(":root", vars, {
  color: {
    background: "#001220",
    black: "#000000",
    dark: "#171219",
    softDark: "#212738",
    smokeyWhite: "#fbf9ff",
    white: "#ffffff",
    blue: "#225560",
    lightBlue: "#5db7de",
    yellow: "#fbaa29",
    lightYellow: "#f9c80e",
    red: "#df2935",
    lightRed: "#fc8c44",
    green: "#49a078",
    lightGreen: "#91f5ad"
  }
});

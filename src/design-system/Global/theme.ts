export const theme = {
  background: "#001220",
  black: "#000000",
  white: "#ffffff",
  smokeyWhite: "#fbf9ff",
  dark: "#171219",
  softDark: "#212738",
  blue: "#225560",
  lightBlue: "#5db7de",
  yellow: "#fbaa29",
  lightYellow: "#f9c80e",
  red: "#df2935",
  lightRed: "#ec4e20",
  green: "#49a078",
  lightGreen: "#91f5ad"
} as const;

export type SupportedColors = keyof typeof theme;

export type ColorVars = `--${SupportedColors}`;

export function isSupportedColor(color: string): color is SupportedColors {
  return color in theme;
}

export const toThemeColor = (color: ColorVars): SupportedColors => {
  const value = color.replace("--", "");

  if (isSupportedColor(value)) return value;

  throw new Error(`Unsupported color ${color}`);
};

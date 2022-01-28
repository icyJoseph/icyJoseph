import { assignVars, createThemeContract, style } from "@vanilla-extract/css";

export const devIconTheme = createThemeContract({
  color: null,
  fontSize: null
});

export const devIcon = style({
  vars: assignVars(devIconTheme, {
    color: "inherit",
    fontSize: "1.6rem"
  }),
  display: "inline-block",
  verticalAlign: "middle",
  fontSize: devIconTheme.fontSize,
  color: devIconTheme.color
});

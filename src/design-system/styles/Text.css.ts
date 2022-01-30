import { style, createThemeContract, assignVars } from "@vanilla-extract/css";
import { theme } from "styles/theme.css";

export const textTheme = createThemeContract({
  fontSize: null,
  fontWeight: null,
  color: null,
  textAlign: null
});

export const textClassName = style({
  vars: assignVars(textTheme, {
    fontSize: "1.6rem",
    fontWeight: "400",
    textAlign: "left",
    color: theme.colors.smokeyWhite
  }),
  fontFamily: "Recursive, sans-serif",
  fontSize: textTheme.fontSize,
  fontWeight: textTheme.fontWeight,
  textAlign: textTheme.textAlign,
  color: textTheme.color
});

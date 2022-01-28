import { style, createThemeContract, assignVars } from "@vanilla-extract/css";
import { theme } from "styles/theme.css";

export const textTheme = createThemeContract({
  fontSize: "fontSize",
  fontWeight: "fontWeight",
  color: "color"
});

export const textClassName = style({
  vars: assignVars(textTheme, {
    fontSize: "1.6rem",
    fontWeight: "400",
    color: theme.colors.smokeyWhite
  }),
  fontFamily: "Recursive, sans-serif",
  fontSize: textTheme.fontSize,
  fontWeight: textTheme.fontWeight,
  color: textTheme.color
});

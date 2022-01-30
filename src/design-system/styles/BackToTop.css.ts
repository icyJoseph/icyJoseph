import { style } from "@vanilla-extract/css";
import { sprinkles } from "design-system/styles/sprinkles.css";
import { theme } from "styles/theme.css";

export const anchor = style({
  fontFamily: "'Fira Code', monospace",
  textDecoration: "underline",
  fontSize: "1.4rem",
  color: theme.colors.smokeyWhite
});

export const wrapper = style([
  {
    textAlign: "right"
  },
  sprinkles({ mt: 4 })
]);

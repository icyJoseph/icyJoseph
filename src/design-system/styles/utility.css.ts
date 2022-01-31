import { style, createThemeContract, assignVars } from "@vanilla-extract/css";

export const fullPage = style({ minHeight: "100vh" });

export const underline = style({ textDecoration: "underline" });

export const bolder = style({ fontWeight: 600 });

export const textContainerTheme = createThemeContract({ maxWidth: null });

export const textContainer = style({
  vars: assignVars(textContainerTheme, { maxWidth: "60ch" }),
  fontFamily: "monospace",
  maxWidth: textContainerTheme.maxWidth
});

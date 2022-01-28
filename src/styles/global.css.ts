import { globalStyle } from "@vanilla-extract/css";
import { theme } from "styles/theme.css";

globalStyle("*", {
  scrollBehavior: "smooth"
});

globalStyle("body", {
  background: theme.colors.background,
  color: theme.colors.smokeyWhite
});

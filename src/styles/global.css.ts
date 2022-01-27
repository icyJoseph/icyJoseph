import { globalStyle } from "@vanilla-extract/css";
import { vars } from "styles/theme.css";

globalStyle("body", {
  background: vars.color.background,
  color: vars.color.smokeyWhite
});

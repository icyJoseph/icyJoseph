import { globalStyle } from "@vanilla-extract/css";

/****** Elad Shechter's RESET *******/
/*** box sizing border-box for all elements ***/
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box"
});

globalStyle("a", {
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer"
});

globalStyle("button", {
  backgroundColor: "transparent",
  color: "inherit",
  borderWidth: 0,
  padding: 0,
  cursor: "pointer"
});

globalStyle("figure", {
  margin: 0
});

globalStyle("input::-moz-focus-inner", {
  border: 0,
  padding: 0,
  margin: 0
});

globalStyle("ul, ol, dd", {
  margin: 0,
  padding: 0,
  listStyle: "none"
});

globalStyle(" h1,  h2,  h3,  h4,  h5,h6", {
  margin: 0,
  fontSize: "inherit",
  fontWeight: "inherit"
});

globalStyle("p", {
  margin: 0
});

globalStyle("cite", {
  fontStyle: "normal"
});

globalStyle("fieldset", {
  borderWidth: 0,
  padding: 0,
  margin: 0
});

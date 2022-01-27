import { globalStyle } from "@vanilla-extract/css";

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

globalStyle("html", {
  lineHeight: 1.15 /* 1 */,
  WebkitTextSizeAdjust: "100%" /* 2 */
});

globalStyle("body", {
  margin: 0
});

globalStyle("main", {
  display: "block"
});

globalStyle("h1", {
  fontSize: "2em",
  margin: "0.67em 0"
});

globalStyle("hr", {
  boxSizing: "content-box" /* 1 */,
  height: 0 /* 1 */,
  overflow: "visible" /* 2 */
});

globalStyle("pre", {
  fontFamily: "monospace, monospace" /* 1 */,
  fontSize: "1em" /* 2 */
});

globalStyle("a", {
  backgroundColor: "transparent"
});

globalStyle("abbr[title]", {
  borderBottom: "none" /* 1 */,
  textDecoration: "underline" /* 2 */
});

globalStyle("b, strong", {
  fontWeight: "bolder"
});

globalStyle("code, kbd, samp", {
  fontFamily: "monospace, monospace" /* 1 */,
  fontSize: "1em" /* 2 */
});

globalStyle("small", {
  fontSize: "80%"
});

globalStyle("sub, sup", {
  fontSize: "75%",
  lineHeight: 0,
  position: "relative",
  verticalAlign: "baseline"
});

globalStyle("sub", {
  bottom: "-0.25em"
});

globalStyle("sup", {
  top: "-0.5em"
});

globalStyle("img", {
  borderStyle: "none"
});

globalStyle("button,  input,  optgroup, select, textarea", {
  fontFamily: "inherit" /* 1 */,
  fontSize: "100%" /* 1 */,
  lineHeight: 1.15 /* 1 */,
  margin: 0 /* 2 */
});

globalStyle("button, input", {
  /* 1 */
  overflow: "visible"
});

globalStyle("button,  select", {
  /* 1 */
  textTransform: "none"
});

globalStyle('button,  [type="button"],  [type="reset"], [type="submit"]', {
  WebkitAppearance: "button"
});

globalStyle(
  'button::-moz-focus-inner,  [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner',
  {
    borderStyle: "none",
    padding: 0
  }
);

globalStyle(
  'button:-moz-focusring,  [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring',
  {
    outline: "1px dotted ButtonText"
  }
);

globalStyle("fieldset", {
  padding: "0.35em 0.75em 0.625em"
});

globalStyle("legend", {
  boxSizing: "border-box" /* 1 */,
  color: "inherit" /* 2 */,
  display: "table" /* 1 */,
  maxWidth: "100%" /* 1 */,
  padding: 0 /* 3 */,
  whiteSpace: "normal" /* 1 */
});

globalStyle("progress", {
  verticalAlign: "baseline"
});

globalStyle("textarea", {
  overflow: "auto"
});

globalStyle('[type="checkbox"],  [type="radio"]', {
  boxSizing: "border-box" /* 1 */,
  padding: 0 /* 2 */
});

globalStyle(
  '[type="number"]::-webkit-inner-spin-button,  [type="number"]::-webkit-outer-spin-button',
  {
    height: "auto"
  }
);

globalStyle('[type="search"]', {
  WebkitAppearance: "textfield" /* 1 */,
  outlineOffset: "-2px" /* 2 */
});

globalStyle('[type="search"]::-webkit-search-decoration', {
  WebkitAppearance: "none"
});

globalStyle("::-webkit-file-upload-button", {
  WebkitAppearance: "button" /* 1 */,
  font: "inherit" /* 2 */
});

globalStyle("details", {
  display: "block"
});

globalStyle("summary", {
  display: "list-item"
});

globalStyle("template", {
  display: "none"
});

globalStyle("[hidden]", {
  display: "none"
});

import { css } from "styled-components";

export const typography = css`
  /* recursive-300 - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 300;
    src: local(""), url("/fonts/recursive-v21-latin-300.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-300.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* recursive-regular - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 400;
    src: local(""),
      url("/fonts/recursive-v21-latin-regular.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* recursive-500 - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 500;
    src: local(""), url("/fonts/recursive-v21-latin-500.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* recursive-600 - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 600;
    src: local(""), url("/fonts/recursive-v21-latin-600.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-600.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* recursive-700 - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 700;
    src: local(""), url("/fonts/recursive-v21-latin-700.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* recursive-800 - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 800;
    src: local(""), url("/fonts/recursive-v21-latin-800.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-800.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* recursive-900 - latin */
  @font-face {
    font-family: "Recursive";
    font-style: normal;
    font-weight: 900;
    src: local(""), url("/fonts/recursive-v21-latin-900.woff2") format("woff2"),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/fonts/recursive-v21-latin-900.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  html {
    font-size: 0.625rem;
  }

  body {
    font-size: 1.6rem;
    font-family: Recursive, sans-serif;
  }
`;

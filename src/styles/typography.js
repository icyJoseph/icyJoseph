import { css } from "styled-components";

export const typography = css`
  @font-face {
    font-family: "Recursive";
    font-display: swap;
    src: url(/fonts/recursive.ttf) format("truetype");
  }

  html {
    font-size: 0.625rem;
  }

  body {
    font-size: 1.6rem;
    font-family: Recursive, sans-serif;
  }
`;

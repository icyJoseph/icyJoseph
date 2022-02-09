import { css } from "styled-components";
import { theme } from "design-system/Global/theme";

export const typography = css`
  html {
    font-size: 0.625rem;
  }

  body {
    font-family: Recursive, sans-serif;
    font-size: 1.6rem;
    line-height: 1.4;
    color: ${theme.smokeyWhite};
    color: var(--white);
  }
`;

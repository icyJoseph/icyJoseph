import { css } from "styled-components";

import { theme } from "design-system/Global/theme";

export const typography = css<{ fontFamily: string }>`
  :root {
    --font-family: ${(props) => props.fontFamily};
  }

  html {
    font-size: 0.625rem;
  }

  body {
    font-family: ${(props) => props.fontFamily};
    font-size: 1.6rem;
    line-height: 1.4;
    color: ${theme.smokeyWhite};
    color: var(--white);
  }
`;

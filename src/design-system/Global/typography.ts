import { css } from "styled-components";

import { theme } from "design-system/Global/theme";

export const typography = css<{ fontFamily: string }>`
  :root {
    --font-recursive: ${(props) => props.fontFamily};
  }

  body {
    font-family: ${(props) => props.fontFamily};
    color: ${theme.smokeyWhite};
    color: var(--white);
  }
`;

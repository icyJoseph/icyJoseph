import { ThemeProvider, createGlobalStyle, css } from "styled-components";
import { normalize } from "styles/normalize";
import { reset } from "styles/reset";
import { root } from "styles/root";

const typography = css`
  @font-face {
    font-family: "Recursive";
    font-display: swap;
    src: url(/public/fonts/recursive.ttf) format("truetype");
  }

  html {
    font-size: 0.625rem;
  }

  body {
    font-size: 1.6rem;
    font-family: Recursive, sans-serif;
    background-color: var(--white);
    color: var(--dark);
  }
`;

const GlobalStyle = createGlobalStyle`
  ${root};
  ${normalize};
  ${reset};
  ${typography};
`;

export default ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

import { useLayoutEffect } from "react";
import { ThemeProvider, createGlobalStyle, css } from "styled-components";
import { normalize } from "styles/normalize";
import { reset } from "styles/reset";
import { root } from "styles/root";

const typography = css`
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

export default ({ theme, children }) => {
  useLayoutEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Recursive:wght@300;400;500;600;677;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

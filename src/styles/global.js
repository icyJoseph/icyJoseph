import { createGlobalStyle } from "styled-components";

import { normalize } from "styles/normalize";
import { reset } from "styles/reset";
import { typography } from "styles/typography";

export const GlobalStyle = createGlobalStyle`
:root {
  --dark: ${({ theme }) => theme.dark ?? "#000000"};
  --lightDark: ${({ theme }) => theme.lightDark ?? "#171219"};
  --white: ${({ theme }) => theme.white ?? "#ffffff"};
  --blue: ${({ theme }) => theme.blue ?? "#225560"};
  --lightBlue: ${({ theme }) => theme.lightBlue ?? "#5db7de"};
  --yellow: ${({ theme }) => theme.yellow ?? "#fbaa29"};
  --lightYellow: ${({ theme }) => theme.lightYellow ?? "#f9c80e"};
  --red: ${({ theme }) => theme.red ?? "#df2935"};
  --lightRed: ${({ theme }) => theme.lightRed ?? "#fc8c44"};
  --green: ${({ theme }) => theme.green ?? "#49a078"};
  --lightGreen: ${({ theme }) => theme.lightGreen ?? "#91f5ad"};
}

@font-face {
  font-family: "Recursive";
  font-display: swap;
  src: url(/fonts/recursive.ttf) format("truetype");
}

${reset};
${normalize};
${typography};

html,
body {
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

code {
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
}

* {
  box-sizing: border-box;
}
`;

import { css } from "styled-components";

export const root = css`
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
`;

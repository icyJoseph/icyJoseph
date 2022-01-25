import { css } from "styled-components";

export const root = css`
  :root {
    --background: #001220;
    --black: ${({ theme }) => theme.black ?? "#000000"};
    --dark: ${({ theme }) => theme.dark ?? "#171219"};
    --softDark: ${({ theme }) => theme.softDark ?? "#212738"};
    --smokeyWhite: ${({ theme }) => theme.smokeyWhite ?? "#fbf9ff"};
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

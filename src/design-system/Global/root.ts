import { css } from "styled-components";
import { theme } from "design-system/Global/theme";

export const root = css`
  :root {
    --background: ${theme.background};
    --black: ${theme.black};
    --dark: ${theme.dark};
    --softDark: ${theme.softDark};
    --smokeyWhite: ${theme.smokeyWhite};
    --white: ${theme.white};
    --blue: ${theme.blue};
    --lightBlue: ${theme.lightBlue};
    --yellow: ${theme.yellow};
    --lightYellow: ${theme.lightYellow};
    --red: ${theme.red};
    --lightRed: ${theme.lightRed};
    --green: ${theme.green};
    --lightGreen: ${theme.lightGreen};
  }
`;

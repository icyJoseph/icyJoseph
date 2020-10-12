import { createGlobalStyle } from "styled-components";

import { normalize } from "styles/normalize";
import { reset } from "styles/reset";
import { root } from "styles/root";
import { typography } from "styles/typography";

export const GlobalStyle = createGlobalStyle`
    ${root};
    ${normalize};
    ${reset};
    ${typography};
    
    body {
        background-color: var(--smokeyWhite);
        color: var(--softDark);
    }
`;

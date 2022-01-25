import { createGlobalStyle } from "styled-components";

import { normalize } from "styles/normalize";
import { reset } from "styles/reset";
import { root } from "styles/root";
import { typography } from "styles/typography";

export const GlobalStyle = createGlobalStyle`
    ${normalize};
    ${reset};
    ${typography};
    
    ${root};
    
    body {
        background-color: var(--background);
        color: var(--smokeyWhite);
    }

    * {
        scroll-behavior:smooth;
    }
`;

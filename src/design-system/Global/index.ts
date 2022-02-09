import { createGlobalStyle } from "styled-components";

import { normalize } from "design-system/Global/normalize";
import { reset } from "design-system/Global/reset";
import { root } from "design-system/Global/root";
import { typography } from "design-system/Global/typography";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    ${normalize};
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

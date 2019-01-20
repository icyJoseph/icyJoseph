import { createGlobalStyle } from "styled-components";
import { baseColors } from ".";

export default createGlobalStyle`
  body {
    color: ${baseColors.primary};
    background: ${baseColors.background};
  }

  #root {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    min-height: 100%;
    
    @media (min-width: 600px) {
      flex-direction: column;
    }
  }
`;

import { createGlobalStyle } from "styled-components";
import { baseColors } from ".";

export default createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    top: 0;
    bottom: 0;
     color: ${baseColors.primary};
      background: ${baseColors.background};
  }

  ::-webkit-scrollbar {
    display: none;
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

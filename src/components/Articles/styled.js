import styled, { css, keyframes } from "styled-components";
import { baseColors } from "../../theme";
import { shadow, transitionAll } from "../Nav";

const scan = keyframes`
  0% {
    clip: rect(0px, 300px, 0px, 0);
  }
  50% { 
   clip: rect(50px, 300px, 57px, 0);
  }
  100% {
    clip: rect(100px, 300px,100px, 0);
  }
`;

const animScan = (delay = 2, duration = 4) => ({ words }) => css`
  animation: ${scan} 3s 4s infinite ease alternate-reverse;
`;

export const ArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Article = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  background: ${baseColors.foreground};
  border-radius: 5px;
  max-width: 300px;
  position: relative;
  ${shadow}
  ${transitionAll}

  > img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  > div {
    position: absolute;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0.5), black 120%);

    > * > span {
      position: relative;
    }

    > * > span:first-child:after {
      ${animScan()}
      text-shadow: -2px 0 ${baseColors.notice};
    }

    > * > span:nth-child(2n):after {
      ${animScan()}
      text-shadow: -2px 0 ${baseColors.secondary};
    }

    > * > span:after {
      content: attr(content);
      border-radius: 5px;
      clip: rect(0, 0, 0, 0);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.15) 1px,
        transparent 4px,
        transparent 5px
      );
    }

    > * {
      height: 100%;
      flex-direction: column;
      display: flex;
      padding: 0 1em;
      justify-content: space-evenly;
    }

    > div > span:first-child {
      color: ${baseColors.info};
      font-size: 1.5rem;
    }
  }
`;

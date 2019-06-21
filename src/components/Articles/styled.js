import styled, { css, keyframes } from "styled-components";
import { shadow } from "../Nav";

export const transitionArticle = css`
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

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

  .fade-in {
    opacity: 1;
  }
`;

export const Article = styled.div`
opacity:0;
  display: flex;
  flex-direction: column;
  margin: 2em;
  background: ${({ theme }) => theme.foreground};
  max-width: 275px;
  position: relative;
  ${shadow}
  ${transitionArticle}

  > img {
    width: 100%;
    height: auto;
  }

  > div {
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0.5), black 120%);
    height: 100%;
    flex-direction: column;
    display: flex;
    padding: 0.5em 1em;
    justify-content: space-evenly;

    > span {
      position: relative;
    }

    >  span:first-child:after {
      ${animScan()}
      text-shadow: -2px 0 ${({ theme }) => theme.notice};
    }

    >  span:nth-child(2n):after {
      ${animScan()}
      text-shadow: -2px 0 ${({ theme }) => theme.secondary};
    }

    >  span:after {
      content: attr(content);
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

    > span:first-child {
      text-align: right;
      font-style: italic;
    }

    > span:nth-child(2) {
      color: ${({ theme }) => theme.info};
      font-size: 1.5rem;
    }
    
   
  }
`;

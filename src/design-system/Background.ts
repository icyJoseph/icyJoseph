import styled, { css } from "styled-components";

const supportIsolate = css`
  @supports (isolation: isolate) {
    & {
      isolation: isolate;
      z-index: unset;
    }
  }
`;

type BackgroundProps = { readingMode?: boolean };

export const Background = styled.div<BackgroundProps>`
  position: fixed;

  z-index: -1;

  top: 0;
  width: 100vw;
  height: 100vh;

  background-attachment: scroll;
  background-image: url("/waves.min.svg");
  background-size: cover;
  background-repeat: no-repeat;

  transform: ${(props) => props.readingMode && "translateY(20%)"};
  transition: transform 0.35s ease-in-out;
  will-change: auto;

  ${supportIsolate};

  & ~ * {
    z-index: 1;

    ${supportIsolate};
  }
`;

export const Layout = styled.div`
  z-index: 1;
  min-height: 100vh;
`;

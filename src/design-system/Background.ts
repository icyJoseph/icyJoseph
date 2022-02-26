import styled, { css } from "styled-components";

const supportIsolate = css`
  @supports (isolation: isolate) {
    & {
      isolation: isolate;
      z-index: unset;
    }
  }
`;

export const Background = styled.div`
  position: fixed;

  z-index: -1;

  top: 0;
  width: 100vw;
  height: 100vh;

  background-attachment: scroll;
  background-image: url("/waves.min.svg");
  background-size: cover;
  background-repeat: no-repeat;

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

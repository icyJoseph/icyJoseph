import styled from "styled-components";

export const Background = styled.div`
  position: fixed;

  z-index: -1;

  width: 100vw;
  height: 100vh;

  background-attachment: scroll;
  background-image: url("/waves.min.svg");
  background-size: cover;
  background-repeat: no-repeat;

  @supports (isolation: isolate) {
    & {
      isolation: isolate;
      z-index: unset;
    }
  }
`;

export const Layout = styled.div`
  z-index: 1;
  min-height: 100vh;

  @supports (isolation: isolate) {
    & {
      isolation: isolate;
      z-index: unset;
    }
  }
`;

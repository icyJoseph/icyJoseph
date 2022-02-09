import styled from "styled-components";

export const Background = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;

  background-attachment: scroll;
  background-image: url("./waves.min.svg");
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Layout = styled.div`
  isolation: isolate;
`;

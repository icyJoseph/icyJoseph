import styled from "styled-components";
import { shadow } from "../../../constants";

export const TabletWrapper = styled.div`
  height: ${props => (props.desktop ? "100vh" : "100%")};
  background: ${props => (props.desktop ? shadow : "dodgerblue")};
  z-index: 1;
`;

export const Background = styled.div`
  position: absolute;
  background-image: ${props => `url(${props.background})`};
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

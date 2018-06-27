import styled from "styled-components";
import { shadow } from "../../../constants";

export const TabletWrapper = styled.div`
  height: 100%;
  background: ${props => (props.desktop ? shadow : "dodgerblue")};
  z-index: 1px;
`;

export const Background = styled.div`
  position: absolute;
  background-image: ${props => `url(${props.background})`};
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

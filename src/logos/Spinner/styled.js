import styled from "styled-components";

import {
  rotate,
  SmallSpinnerPath,
  MediumSpinnerPath,
  LargeSpinnerPath
} from "./animations";

const animations = {
  small: SmallSpinnerPath,
  medium: MediumSpinnerPath,
  large: LargeSpinnerPath
};

export const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SvgContainer = styled.svg`
  animation: ${rotate} 1.3s linear infinite;
`;

export const SvgCircle = styled.circle`
  ${props => animations[props.size]};
`;

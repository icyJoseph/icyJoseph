import styled, { css, keyframes } from "styled-components";

import { baseColors } from "../../theme";

const breath = keyframes`
0%{
    opacity:0
}

40% {
    opacity: 1
}

80%{
    opacity: 1
}

100%{
    opacity:0
}
`;

const fadeInOut = ({ time }) =>
  css`
    ${breath} ${time}s ease infinite
  `;

export const Fader = styled.span`
  animation: ${fadeInOut};

  > a {
    text-decoration: none;
    color: ${baseColors.heading};
  }
`;

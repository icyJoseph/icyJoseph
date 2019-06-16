import styled from "styled-components";

import { baseColors } from "../../theme";

export const Fader = styled.span`
  > * {
    opacity: ${({ opaque }) => (opaque ? 0 : 1)};
    transition: opacity 1s ease;
    text-decoration: none;
    color: ${baseColors.heading};
  }
`;

import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const Divider = styled.hr<SpaceProps>`
  ${space};
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  &:last-child {
    border-bottom: none;
  }
`;

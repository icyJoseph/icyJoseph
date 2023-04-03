import { space, SpaceProps } from "@styled-system/space";
import styled from "styled-components";

export const Divider = styled.hr<SpaceProps>`
  ${space};
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

import { space, SpaceProps } from "@styled-system/space";
import styled from "styled-components";

export const Ul = styled.ul<SpaceProps>`
  ${space};
  list-style: disc;
  list-style-position: inside;
`;

export const Ol = styled.ol<SpaceProps>`
  ${space};
  list-style: numeric;
  list-style-position: inside;
`;

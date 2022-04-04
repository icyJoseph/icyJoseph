import { space, SpaceProps } from "@styled-system/space";
import styled from "styled-components";

type StaleProps = SpaceProps & { $stale?: boolean };

export const Stale = styled.div<StaleProps>`
  ${space};
  display: block;
  width: 100%;
  opacity: ${({ $stale = false }) => ($stale ? 0.3 : 1)};
  transition: opacity 1s ease-in-out;
`;

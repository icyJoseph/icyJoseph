import styled from "styled-components";
import { space } from "@styled-system/space";

export const Flex = styled.div`
  ${space};
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyContent = "unset" }) => justifyContent};
  align-items: ${({ alignItems = "unset" }) => alignItems};
`;

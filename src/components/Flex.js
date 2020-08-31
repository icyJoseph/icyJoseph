import styled from "styled-components";
import { space } from "@styled-system/space";

export const Flex = styled.div`
  ${space};
  display: flex;
  flex-wrap: ${({ flexWrap = "wrap" }) => flexWrap};
  flex-direction: ${({ flexDirection = "unset" }) => flexDirection};
  justify-content: ${({ justifyContent = "unset" }) => justifyContent};
  align-items: ${({ alignItems = "unset" }) => alignItems};
`;

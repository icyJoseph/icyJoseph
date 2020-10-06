import styled from "styled-components";
import { space } from "@styled-system/space";

export const Text = styled.p`
  ${space};
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
  text-align: ${({ textAlign = "unset" }) => textAlign};
  color: ${({ color = "--black", theme }) => `var(${color}, ${theme.white})`};
  font-weight: ${({ fontWeight = 400 }) => fontWeight ?? 400};
`;

import styled from "styled-components";
import { space } from "@styled-system/space";

export const Text = styled(({ as: Element = "p", ...props }) => (
  <Element {...props} />
))`
  ${space};
  text-align: ${(align = "unset") => align};
  color: ${({ color, theme }) => `var(${color}, ${theme.white})`};
`;

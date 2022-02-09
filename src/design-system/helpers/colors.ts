import { css } from "styled-components";

import { ColorVars, theme } from "design-system/Global/theme";

export const color = css<{ $color: ColorVars }>`
  color: ${({ $color }) => theme[$color]};
  color: ${({ $color }) => `var(${$color})`};
`;

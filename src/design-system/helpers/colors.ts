import { css } from "styled-components";

import {
  type ColorVars,
  theme,
  toThemeColor
} from "design-system/Global/theme";

export const color = css<{ $color: ColorVars }>`
  color: ${({ $color }) => theme[toThemeColor($color)]};
  color: ${({ $color }) => `var(${$color})`};
`;

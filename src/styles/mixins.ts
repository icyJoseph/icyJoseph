import { css } from "styled-components";

import { space } from "@styled-system/space";

export const maxWidthUtility = css`
  max-width: clamp(65ch, 80%, 85ch);
  ${space({ px: 2, mx: "auto" })};
`;

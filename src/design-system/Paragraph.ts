import styled from "styled-components";

import { theme } from "design-system/Global/theme";
import { Text } from "design-system/Text";

export const Paragraph = styled(Text)`
  font-weight: 300;
  line-height: 1.5;

  & code {
    color: ${theme.lightGreen};
    color: var(--lightGreen);
    font-family: inherit;
    font-weight: 400;
  }
`;

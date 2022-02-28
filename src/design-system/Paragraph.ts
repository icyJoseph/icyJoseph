import styled from "styled-components";

import { Text } from "design-system/Text";
import { theme } from "design-system/Global/theme";

export const Paragraph = styled(Text)`
  font-weight: 300;
  line-height: 1.5;

  & code {
    color: ${theme.lightGreen};
    color: var(--lightGreen);
  }
`;

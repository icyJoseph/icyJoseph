import styled from "styled-components";

import { Text } from "design-system/Text";

export const OneLiner = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

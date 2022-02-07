import styled from "styled-components";
import { Box } from "design-system/Box";

type ParagraphProps = {
  chars: `${string}ch`;
};

export const Paragraph = styled(Box)<ParagraphProps>`
  font-family: sans-serif;
  max-width: ${({ chars = "55ch" }) => chars};
`;

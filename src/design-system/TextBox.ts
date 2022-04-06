import styled from "styled-components";

import { Box } from "design-system/Box";

type TextBoxProps = {
  chars?: `${string}ch`;
};

const defaultMax: `${string}ch` = "55ch";

export const TextBox = styled(Box)<TextBoxProps>`
  font-family: sans-serif;
  max-width: ${({ chars = defaultMax }) => chars};
`;

import styled from "styled-components";
import { baseColors } from "../../theme";

export const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  > * {
    &:first-child {
      margin-top: 0.2em;
      margin-right: 0.5em;
    }
    &:not(:first-child) {
      margin: 0 0.5em;
      margin-top: 0.2em;
    }
  }
`;

export const Tag = styled.span`
  background: ${baseColors.foreground};
  border-radius: 0.5em;
  padding: 0.15em 0.25em;
`;

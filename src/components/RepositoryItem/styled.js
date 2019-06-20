import styled from "styled-components";
import { baseColors } from "../../theme";

export const RepoItem = styled.li`
  color: ${({ selected }) => (selected ? `${baseColors.warning}` : "inherit")};
  font-weight: ${({ selected }) => (selected ? "700" : "unset")};
  cursor: ${({ selected }) => (selected ? "pointer" : "unset")};
  transition: all 1s ease;
  white-space: nowrap;
  text-align: right;
  margin: 0.25em;
  position: relative;

  @media (min-width: 820px) {
    width: ${({ selected }) => (selected ? "100%" : "0")};
    &:before {
      content: "close";
      opacity: ${({ selected }) => (selected ? 1 : 0)};
      position: absolute;
      left: 0;
      transition: opacity 1s ease;
      z-index: -1;
    }
  }

  > span {
    cursor: pointer;
  }
`;

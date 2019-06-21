import styled from "styled-components";

export const Tags = styled.div`
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

Tags.Entry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.foreground};
  border-radius: 0.5em;
  padding: 0.15em 0.25em;
`;

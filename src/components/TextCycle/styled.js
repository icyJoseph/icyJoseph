import styled from "styled-components";

export const Fader = styled.span`
  > * {
    opacity: ${({ opaque }) => (opaque ? 0 : 1)};
    transition: opacity 1s ease;
    text-decoration: none;
    color: ${({ theme }) => theme.heading};
  }
`;

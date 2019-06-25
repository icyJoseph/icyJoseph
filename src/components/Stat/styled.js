import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
0% {
  opacity: 0;
  max-height: 0;
}
100% {
  opacity: 1;
  max-height: 500px;
}
`;

export const Statistics = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  align-self: center;
  animation: ${fadeIn} 1s ease;
`;

export const StatWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5em;
`;

export const StatLabel = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.info};
`;

export const StatCount = styled.span`
  color: ${({ theme }) => theme.light};
  font-size: 24pt;
`;

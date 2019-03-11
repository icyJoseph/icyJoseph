import styled, { keyframes } from "styled-components";
import { baseColors } from "../../theme";

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const Statistics = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  align-self: center;
`;

export const StatWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5em;
  animation: ${fadeIn} 2s;
`;

export const StatLabel = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${baseColors.info};
`;

export const StatCount = styled.span`
  color: ${baseColors.light};
  font-size: 24pt;
`;

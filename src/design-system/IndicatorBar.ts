import styled from "styled-components";

type IndicatorBarProps = { percentage: number; color: string };

export const IndicatorBar = styled.div<IndicatorBarProps>`
  height: 8px;
  border-radius: 6px;

  width: ${({ percentage }) => `${percentage}%`};
  background: ${({ color }) => color};
`;

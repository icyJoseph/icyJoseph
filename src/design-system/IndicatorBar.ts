import styled from "styled-components";

type IndicatorBarProps = { color: string };

export const IndicatorBar = styled.div<IndicatorBarProps>`
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

import styled from "styled-components";

export const Group = styled(Statistic.Group)`
  padding: 10px 10px;
  justify-content: center;
  @media (max-width: 649px) {
    padding: 20px 20px;
  }
`;

export const Stat = styled(Statistic)`
  padding: 5px 5px;
  @media (max-width: 649px) {
    padding: 10px 10px;
  }
`;

export const Value = styled(Statistic.Value)``;

export const Label = styled(Statistic.Label)``;

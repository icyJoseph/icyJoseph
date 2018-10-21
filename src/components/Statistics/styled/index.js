import styled from "styled-components";
import { Statistic } from "semantic-ui-react";

export const Group = styled(Statistic.Group)`
  padding: 10px 10px;
  justify-content: center;
  @media (max-width: 649px) {
    padding: 20px 20px;
  }
`;

export const Stat = styled(Statistic)`
  font-size: 16pt;
  padding: 5px 5px;
  @media (max-width: 649px) {
    padding: 10px 10px;
  }
`;

export const Value = styled(Statistic.Value)`
  font-size: 32pt;
`;

export const Label = styled(Statistic.Label)``;

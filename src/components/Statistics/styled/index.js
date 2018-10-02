import styled from "styled-components";

export const Group = styled.div`
  min-height: 120px;
  height: auto !important;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px 10px;
  justify-content: space-around;
  width: ${props => (props.compact ? "auto" : "60%")};
  color: white;
  @media (max-width: 649px) {
    margin: 20px 10px;
  }
`;

export const Stat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 16pt;
  align-items: center;
  margin: 5px 5px;
  flex-wrap: wrap;
  @media (max-width: 649px) {
    margin: 10px 10px;
  }
`;

export const Value = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32pt;
`;

export const Label = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  word-wrap: wrap;
  min-width: 150px;
  max-width: 150px;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin}px 0;
`;

export const IconWrapper = styled.div`
  flex: 4;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import styled from "styled-components";

export const Group = styled.div.attrs({
  style: props => ({
    maxHeight: props.grow ? "140px" : "120px"
  })
})`
  transition: max-height 2s linear;
  min-height: 120px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1%;
  color: white;
`;

export const Stat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 16pt;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const Value = styled.div`
  flex: 4;
  height: 20px;
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

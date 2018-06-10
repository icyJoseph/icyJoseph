import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 300px;
  margin: 5px;
  border-radius: 3%;
  padding: 15px;
  background: white;
`;

export const TitleWrapper = styled.span`
  font-size: 14pt;
  display: block;
  padding-bottom: 10px;
  margin: 3px;
`;

export const MetaWrapper = styled.span`
  color: gray;
  opacity: 0.7;
  display: block;
  font-size: 12pt;
  margin: 3px;
`;

export const DescriptionWrapper = styled.span`
  font-size: 12pt;
  overflow: hidden;
  margin: 3px;
`;

export const Point = styled.div`
  background: white;
  width: 10px;
  height: 10px;
  margin: 10 0;
  border-radius: 100%;
`;

export const Line = styled.div`
  background: white;
  width: 4px;
  margin: 10px auto;
  height: 20px;
`;

export const TimeWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Connection = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

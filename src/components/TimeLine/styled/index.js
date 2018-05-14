import styled from "styled-components";

export const CardWrapper = styled.div`
  position: absolute;
  width: 164px;
  margin: 5px;
  border-radius: 5%;
  margin-left: ${props => (props.left ? "-170px" : "10px")};
  padding: 15px;
  background: ${props => (props.color ? props.color : "white")};
`;

export const TitleWrapper = styled.span`
  font-size: 14pt;
  display: block;
  padding-bottom: 10px;
`;

export const MetaWrapper = styled.span`
  color: gray;
  opacity: 0.7;
  display: block;
  font-size: 12pt;
`;

export const DescriptionWrapper = styled.span`
  font-size: 12pt;
  display: block;
`;

export const Line = styled.div`
  background: white;
  width: 4px;
  min-height: 150px;
  height: 220px;
  margin: auto;
`;

export const Point = styled.div`
  background: white;
  width: 10px;
  height: 10px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 100%;
`;

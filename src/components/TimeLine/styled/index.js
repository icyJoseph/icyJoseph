import styled from "styled-components";
import { golden, orange, transparent, white } from "../../../constants";

export const CardWrapper = styled.div`
  width: 300px;
  margin: 5px;
  border-radius: 3%;
  padding: 15px;
  background: ${props => (props.experience ? transparent : white)};
`;

export const TitleWrapper = styled.span`
  font-size: 14pt;
  display: block;
  padding-bottom: 10px;
  margin: 3px 0;
  color: ${props => (props.experience ? golden : "black")};
`;

export const MetaWrapper = styled.span`
  color: gray;
  opacity: 0.7;
  display: block;
  font-size: 12pt;
  margin: 3px 0;
  color: ${props => (props.experience ? orange : "black")};
`;

export const DescriptionWrapper = styled.span`
  font-size: 12pt;
  overflow: hidden;
  margin: 10px 0;
  text-align: left;
  color: ${props => (props.experience ? white : "black")};
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
  margin-top: 25px;
`;

export const Connection = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

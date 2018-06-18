import styled from "styled-components";
import { colorPicker } from "../helpers";
import { white, golden, orange } from "../../../constants";

export const LibraryWrapper = styled.div`
  color: ${white};
`;

export const TitleWrapper = styled.h3`
  color: ${golden};
`;

export const SubTitleWrapper = styled.h4`
  color: ${orange};
`;

export const Description = styled.div`
  padding: 5px;
`;

export const FunctionCard = styled.div`
  margin: 10px 0 20px 0;
  width: 300px;
`;

export const FunctionName = styled.div`
  font-size: 12pt;
  margin: 5px;
  color: ${golden};
`;

export const FunctionDescription = styled.div`
  margin: 5px;
`;

export const Frame = styled.div`
  border: 1px solid ${golden};
  border-radius: 10px;
  padding: 20px;
`;

export const Syntax = styled.span`
  color: ${props => colorPicker(props.word)};
`;

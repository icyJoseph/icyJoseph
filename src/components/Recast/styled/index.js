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
  margin: 5px 0;
  color: ${golden};
`;

export const FunctionDescription = styled.div`
  margin: 5px 0;
`;

export const Frame = styled.div`
  padding: 20px;
`;

export const Syntax = styled.span`
  color: ${props => colorPicker(props.word)};
`;

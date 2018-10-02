import styled from "styled-components";
import { colorPicker } from "../helpers";
import { white, golden, orange } from "../../../constants";

export const LibraryWrapper = styled.div`
  margin: 0 auto;
  color: ${white};
  width: 80%;
`;

export const TitleWrapper = styled.h3`
  color: ${golden};
`;

export const SubTitleWrapper = styled.h4`
  color: ${orange};
`;

export const Description = styled.div`
  padding: 5px;
  width: 80%;
`;

export const FunctionCard = styled.div`
  margin: 0 auto;
  width: 80%;
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

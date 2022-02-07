import styled from "styled-components";
import { space } from "@styled-system/space";

export const DataEntry = styled.div`
  ${space({ mx: 1, mt: 2 })};
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;

  & > p,
  & > span {
    ${space({ my: 1 })}
    text-transform: capitalize;
  }

  & > p:first-child,
  & > span:first-child {
    font-size: 1.8rem;
  }
`;

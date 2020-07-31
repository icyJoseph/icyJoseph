import styled from "styled-components";
import { space } from "@styled-system/space";

export const Container = styled.main`
  display: grid;
  grid-template-columns: 5% 1fr 5%;
  grid-template-rows: auto;
  grid-template-areas: ". main .";
`;

Container.Main = styled.section`
  ${space({ pt: 1, px: 1, m: "0 auto" })}
  justify-self: center;
  grid-area: main;
`;

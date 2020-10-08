import styled from "styled-components";
import { space } from "@styled-system/space";

export const Container = styled.main`
  ${space({ mx: "auto" })};
  ${space};
  width: 95%;

  @media (min-width: 320px) {
    width: 90%;
  }

  & > section:last-child {
    ${space({ mb: 4 })};
  }
`;

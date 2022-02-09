import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const Container = styled.section<SpaceProps>`
  ${space};

  font-family: sans-serif;

  display: -ms-grid;
  display: grid;

  -ms-grid-columns: 1fr minmax(1fr, 85ch) 1fr;
  grid-template-columns: 1fr min(85ch, 100%) 1fr;

  & > section:last-child {
    ${space({ mb: 4 })};
  }

  & > * {
    -ms-grid-column: 2;
    grid-column: 2;
  }
`;

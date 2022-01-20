import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const Container = styled.section<SpaceProps>`
  ${space};

  display: grid;
  grid-template-columns:
    1fr
    min(85ch, 100%)
    1fr;

  & > section:last-child {
    ${space({ mb: 4 })};
  }

  & > * {
    grid-column: 2;
  }
`;

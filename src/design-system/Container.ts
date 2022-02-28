import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const Container = styled.section<SpaceProps>`
  ${space};

  font-family: sans-serif;

  display: flex;
  flex-direction: column;
  max-width: 85ch;
  ${space({ mx: "auto" })};

  & > section:last-child {
    ${space({ mb: 4 })};
  }
`;

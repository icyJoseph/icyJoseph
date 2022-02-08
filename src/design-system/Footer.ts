import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const PageFooter = styled.footer<SpaceProps>`
  ${space({ px: 4, py: 3 })};

  background: var(--background);
  color: var(--smokeyWhite);

  > section {
    font-family: sans-serif;
    max-width: 85ch;
    ${space({ mx: "auto" })}
  }
`;

import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

export const PageFooter = styled.footer<SpaceProps>`
  ${space({ px: 4, py: "5%", mt: 5 })};

  z-index: 1;

  @supports (isolation: isolate) {
    & {
      isolation: isolate;
      z-index: unset;
    }
  }

  background: var(--background);
  color: var(--smokeyWhite);

  > section {
    font-family: sans-serif;
    max-width: 85ch;
    ${space({ mx: "auto" })}
  }
`;

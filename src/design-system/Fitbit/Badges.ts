import styled from "styled-components";
import { space } from "@styled-system/space";

import { BaseCard } from "design-system/Card";
import { Flex } from "design-system/Flex";

export const Badge = styled.div`
  ${space({ my: 2, mx: "auto" })};
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid var(--smokeyWhite);
`;

export const BadgesWrapper = styled(Flex)`
  flex-direction: column;

  & ${BaseCard} {
    max-width: 66.66%;
  }

  @media (min-width: 40em) {
    flex-direction: row;

    & ${BaseCard} {
      max-width: 90%;
    }
  }
`;

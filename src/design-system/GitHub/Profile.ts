import styled from "styled-components";
import { space } from "@styled-system/space";

import { Flex } from "design-system/Flex";

export const Profile = styled.div`
  grid-column: span 2;
  justify-content: center;

  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    max-width: 75%;
  }

  @media (min-width: 540px) {
    grid-template-columns: minmax(250px, 33.33%) 1fr;
  }

  > section {
    ${space({ mx: "auto", mt: 4, px: 2 })};

    @media (min-width: 540px) {
      ${space({ mt: 0, px: 0 })};
    }
  }

  > section header {
    text-align: center;

    @media (min-width: 540px) {
      text-align: left;
    }
  }
`;

export const Bio = styled(Flex)`
  overflow: hidden;
`;

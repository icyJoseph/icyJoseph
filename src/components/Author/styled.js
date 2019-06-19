import styled from "styled-components";
import { baseColors } from "../../theme";

export const AuthorCard = styled.div`
  display: flex;
  margin: 1em;
  border-radius: 5px;
  justify-content: center;

  > img {
    display: none;
    border-radius: 50%;

    @media (min-width: 322px) {
      display: block;
    }
  }

  > div {
    margin: 1em;
    display: flex;
    flex-direction: column;

    > span:first-child {
      color: ${baseColors.heading};
    }
    > span:nth-child(2n) {
      color: ${baseColors.info};
    }
  }
`;

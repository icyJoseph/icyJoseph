import styled from "styled-components";
import { baseColors } from "../../theme";

export const AuthorCard = styled.div`
  display: flex;
  margin: 1em;
  border-radius: 5px;
  justify-content: center;

  > img {
    border-radius: 50%;
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

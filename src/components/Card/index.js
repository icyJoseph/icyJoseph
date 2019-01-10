import styled from "styled-components";
import { baseColors } from "../../theme";

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  background: ${baseColors.foreground};
  border-radius: 5px;
  max-width: 300px;

  > img {
    width: 100%;
    height: auto;
    border-radius: 5px 5px 0 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    padding: 1em;

    > span:first-child {
      color: ${baseColors.info};
    }
  }
`;

export const Author = styled.div`
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

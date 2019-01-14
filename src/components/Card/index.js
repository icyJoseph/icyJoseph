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
  position: relative;

  > img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  > div {
    position: absolute;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);

    > * {
      height: 100%;
      flex-direction: column;
      display: flex;
      padding: 0 1em;
      justify-content: space-evenly;
    }

    > div > span:first-child {
      color: ${baseColors.info};
      font-size: 1.5rem;
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

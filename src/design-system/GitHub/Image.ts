import styled from "styled-components";
import { space } from "@styled-system/space";

export const GitHubImg = styled.span`
  ${space({ m: "auto" })};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;

  @media (min-width: 540px) {
    width: 75%;
  }

  & > span {
    box-shadow: 0 0 0 2px white;
    border-radius: 50%;
  }

  & > span:before {
    position: absolute;
    content: "";
    background-color: var(--background);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

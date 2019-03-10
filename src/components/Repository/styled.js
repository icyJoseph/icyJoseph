import styled from "styled-components";
import { baseColors } from "../../theme";
import { shadow, transitionAll } from "../Nav";

export const RepoWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0.5em;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5em;
  border-radius: 1em;
  ${shadow}
  ${transitionAll}
  font-size: 1em;
  max-width: 300px;
  min-width: 300px;

  > div {
    flex: 1;
  }

  > div:nth-child(3) {
    flex: 2;
  }

  > div:first-child {
    font-size: 1.5em;
    color: ${baseColors.heading};
  }

  > div:nth-child(2) {
    font-size: 1.25em;
    color: ${baseColors.subheading};
  }

  > div:last-child {
    flex: 3;
    justify-self: flex-end;
  }
`;

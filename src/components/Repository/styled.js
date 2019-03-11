import styled from "styled-components";
import { baseColors } from "../../theme";
import { shadow, transitionAll } from "../Nav";

export const RepoWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 0.5em;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5em;
  border-radius: 1em;
  ${shadow}
  ${transitionAll}
  font-size: 1em;
  max-width: 300px;
  min-width: 200px;

  > div {
    display: flex;
    margin: 0.25em 0;
  }

  > div:nth-child(1) {
    flex-direction: column;
  }

  > div:first-child {
    font-size: 1.5em;
    color: ${baseColors.heading};
  }

  > div:nth-child(2) {
    display: flex;
    font-size: 1.25em;
    justify-content: space-between;
    color: ${baseColors.subheading};
    flex-wrap: wrap;
  }

  > div:last-child {
    justify-self: flex-end;
    font-size: 0.65em;
  }

  .data-field {
    margin: 0 0.25em;
  }

  .description-field {
    margin: 0.5em 0;
    font-size: 0.9em;
    color: ${baseColors.light};
    word-break: break-word;
  }

  .ownership-field {
    color: ${baseColors.info};
    font-size: 0.6em;

    > span {
      margin: 0 0.25em;
    }
  }

  .refs-field {
    display: flex;
    font-size: 1.25em;

    > * {
      height: 100%;
      color: ${baseColors.success};
      display: flex;
      margin-right: 1em;
    }
  }

  .dates-field {
    justify-content: space-between;
    flex-wrap: wrap;

    > * {
      display: flex;
      align-items: center;
      font-size: 0.8em;
      font-style: italic;
      color: ${baseColors.default};
      margin-right: 0.25em;
    }

    > * > * {
      margin: 0.15em;
    }
  }
`;

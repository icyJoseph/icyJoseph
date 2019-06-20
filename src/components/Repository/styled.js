import styled from "styled-components";
import { baseColors } from "../../theme";
import { shadow } from "../Nav";

export const RepoItem = styled.li`
  color: ${({ selected }) => (selected ? `${baseColors.warning}` : "inherit")};
  font-weight: ${({ selected }) => (selected ? "700" : "unset")};
  cursor: ${({ selected }) => (selected ? "pointer" : "unset")};
  transition: all 1s ease;
  white-space: nowrap;
  text-align: right;
  margin: 0.25em;
  position: relative;

  @media (min-width: 820px) {
    width: ${({ selected }) => (selected ? "100%" : "0")};
    &:before {
      content: "close";
      opacity: ${({ selected }) => (selected ? 1 : 0)};
      position: absolute;
      left: 0;
      transition: opacity 1s ease;
      z-index: -1;
    }
  }

  > span {
    cursor: pointer;
  }
`;

export const Repo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 1em 1.5em;
  padding: 0.5em;
  min-height: 350px;

  font-size: 1em;

  > div {
    display: flex;
    justify-content: center;
    margin: 0.25em 0;
  }

  .centered {
    text-align: center;
  }
`;

Repo.Title = styled.div`
  flex: 1;
  font-size: 1.5em;
  color: ${baseColors.heading};
`;

Repo.Subtitle = styled.div`
  flex: 2;
  display: flex;
  font-size: 1.25em;
  flex-direction: column;
  color: ${baseColors.subheading};
  flex-wrap: wrap;
`;

Repo.Description = styled.div`
  flex: 3;
  margin: 0.5em 0;
  font-size: 0.9em;
  color: ${baseColors.light};
  word-break: break-word;
`;

Repo.DataField = styled.span`
  margin: 0 0.25em;
  justify-content: center;
`;

Repo.DatesField = styled.div`
  flex-direction: column;
  min-height: 20px;

  > * {
    display: flex;
    align-items: center;
    font-size: 0.8em;
    font-style: italic;
    color: ${baseColors.default};
    margin-right: 0.25em;
    justify-content: center;
  }

  > * > * {
    margin: 0.15em;
  }
`;

Repo.RefsField = styled.div`
  display: flex;
  font-size: 1.25em;

  > * {
    height: 100%;
    color: ${baseColors.success};
    display: flex;
    margin-right: 1em;
  }
`;

export const Tags = styled.div`
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  justify-content: start;
  justify-self: flex-end;
  font-size: 0.65em;

  > * {
    height: 20px;
    &:first-child {
      margin-top: 0.2em;
      margin-right: 0.5em;
    }
    &:not(:first-child) {
      margin: 0 0.5em;
      margin-top: 0.2em;
    }
  }
`;

Tags.Entry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${baseColors.foreground};
  border-radius: 0.5em;
  padding: 0.15em 0.25em;
`;

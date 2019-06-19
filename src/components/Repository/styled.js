import styled from "styled-components";
import { baseColors } from "../../theme";
import { shadow } from "../Nav";

export const RepoItem = styled.li`
  width: ${({ selected }) => (selected ? "100%" : "0")};
  transition: width 1s ease;
  text-align: right;
  white-space: nowrap;
  margin: 0.25em;
  cursor: pointer;
`;

export const Repo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 1em 1.5em;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5em;
  height: 350px;

  ${shadow}
  font-size: 1em;
  max-width: 300px;
  min-width: 200px;

  > div {
    display: flex;
    margin: 0.25em 0;
  }
`;

Repo.Title = styled.div`
  font-size: 1.5em;
  color: ${baseColors.heading};
`;

Repo.Subtitle = styled.div`
  display: flex;
  font-size: 1.25em;
  flex-direction: column;
  color: ${baseColors.subheading};
  flex-wrap: wrap;
`;

Repo.Description = styled.div`
  margin: 0.5em 0;
  font-size: 0.9em;
  color: ${baseColors.light};
  word-break: break-word;
`;

Repo.DataField = styled.span`
  margin: 0 0.25em;
`;

Repo.DatesField = styled.div`
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
  flex-wrap: wrap;
  justify-content: start;
  justify-self: flex-end;
  font-size: 0.65em;

  > * {
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

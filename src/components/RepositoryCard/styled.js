import styled from "styled-components";

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
  color: ${({ theme }) => theme.heading};
`;

Repo.Subtitle = styled.div`
  flex: 2;
  display: flex;
  font-size: 1.25em;
  flex-direction: column;
  color: ${({ theme }) => theme.subheading};
  flex-wrap: wrap;
`;

Repo.Description = styled.div`
  flex: 3;
  margin: 0.5em 0;
  font-size: 0.9em;
  color: ${({ theme }) => theme.light};
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
    color: ${({ theme }) => theme.default};
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
    color: ${({ theme }) => theme.success};
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
  background: ${({ theme }) => theme.foreground};
  border-radius: 0.5em;
  padding: 0.15em 0.25em;
`;

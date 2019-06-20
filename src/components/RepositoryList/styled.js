import styled from "styled-components";

export const StyledRepositoryList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  padding: 0.5em;
  list-style: none;

  @media (min-width: 599px) {
    flex-direction: column;
    flex-wrap: unset;
  }
`;

export const RepoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em 0.5em;
  align-self: center;
  width: 90%;
  flex-direction: column;

  @media (min-width: 599px) {
    flex-direction: row;
  }

  @media (min-width: 820px) {
    width: 70%;
  }
`;

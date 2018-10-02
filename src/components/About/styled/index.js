import styled from "styled-components";

export const GitHubCard = styled.div`
margin: 0 auto,
width: 80%
`;

export const GitHubBio = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const GitHubBioHeader = styled.div`
  color: white;
`;

export const GitHubBioText = styled(GitHubBioHeader)`
  text-align: center;
  width: 80%;
  margin-top: 10px;
  @media (min-width: 1023px) {
    width: 40%;
  }
`;

export const GitHubExtra = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

export const GitHubLink = styled.a`
  display: flex;
  justify-content: center;
  color: #4af626;
  margin: 0 10px;
`;

export const UnderLined = styled.span`
  text-decoration: underline;
`;

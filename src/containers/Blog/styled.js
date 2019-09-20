import styled from "styled-components";

export const BlogWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 599px) {
    justify-content: flex-start;
    margin-top: 1em;
    margin-bottom: 4em;
  }
`;

BlogWrap.Info = styled.p`
  width: 40%;
  text-align: center;
`;

BlogWrap.Icon = styled.div`
  font-size: 2em;
`;

BlogWrap.Content = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  > * {
    margin: 0.5em;
    justify-self: center;
    align-self: center;
  }
`;

BlogWrap.Link = styled.a`
  background: ${({ theme }) => theme.background};
  color: white;
  margin-top: 2em;
  padding: 0.3em 0.5em;
  position: relative;
  text-decoration: none;
  border-radius: 0.3em;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.22), 0 1px 6px rgba(0, 0, 0, 0.34);

  &:hover {
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35), 0 7px 15px rgba(0, 0, 0, 0.32),
      0 -3px 15px rgba(0, 0, 0, 0.32);
  }
`;

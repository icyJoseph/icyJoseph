import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: dodgerblue;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  text-align: center;
  margin-top: 1em;
`;

const SadFace = styled.div`
  font-size: 48pt;
  margin: 0.5em;
`;

export const Error = styled.span`
  background: #fff;
  color: dodgerblue;
  padding: 2px 8px;
  font-weight: bold;
`;

const Menu = styled.div`
  text-align: center;
  margin-top: 1em;
`;

const Paragraph = styled.p`
  margin: 0.5em auto;
  text-align: center;
`;

const Link = styled.a`
  margin: 0.5em;
  color: white;
  text-decoration: underline;
`;

const BSOD = () => (
  <Wrapper>
    <Container>
      <Error>ERROR IE DETECTED</Error>
      <SadFace>:(</SadFace>
      <Paragraph>
        Unfortunately, I do not have access to a computer with IE.
        <br />
        You can either:
      </Paragraph>
      <Paragraph>Visit my GitHub page, or download another browser.</Paragraph>
      <Menu>
        <Link
          href="https://github.com/icyJoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome
        </Link>
      </Menu>
      <Paragraph>* Do not send me an e-mail to notify about this.</Paragraph>
    </Container>
  </Wrapper>
);

export default BSOD;

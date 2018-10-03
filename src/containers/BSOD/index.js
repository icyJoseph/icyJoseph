import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: dodgerblue;
  color: white;
  height: 100%;
  width: 100%;
  position: fixed;
`;

const Container = styled.div`
  margin-top: 100px;
  text-align: center;
  height: 100%;
  width: 100%;
`;

const SadFace = styled.div`
  font-size: 48pt;
  margin: 40px;
`;

export const Error = styled.span`
  background: #fff;
  color: dodgerblue;
  padding: 2px 8px;
  font-weight: bold;
`;

const Menu = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Paragraph = styled.p`
  margin: 30px 100px;
  text-align: center;
`;

const Link = styled.a`
  margin: 10px;
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
        You can either wait until I do, or download another browser.
      </Paragraph>
      <Paragraph>* Do not send me an e-mail to notify about this.</Paragraph>
      <Paragraph>You can instead visit my GitHub page.</Paragraph>
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
    </Container>
  </Wrapper>
);

export default BSOD;

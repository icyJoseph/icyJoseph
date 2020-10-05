import Link from "next/link";
import styled from "styled-components";
import { space } from "@styled-system/space";

import { entries } from "composition/Navigation";

const StyledFooter = styled.footer`
  ${space};
  background: var(--softDark);
  color: var(--smokeyWhite);
  display: grid;
  grid-template-columns: repeat(4, minmax(min-content, 1fr));
`;

const CopyrightNotice = styled.span`
  grid-column: span 4;
  text-align: center;
`;

const Stack = styled.div`
  ${space};

  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 1;
  }

  > span {
    text-decoration: underline;
  }
`;

const List = styled.ul`
  > li {
    ${space({ my: 2 })};
  }
`;

const FooterNav = styled.nav`
  ${space};
  grid-column: 2 / 4;
  text-align: center;

  @media (min-width: 768px) {
    grid-column: span 1;
    text-align: end;
  }
`;

const Notice = styled.span`
  grid-column: span 2;
  text-align: start;

  @media (min-width: 768px) {
    text-align: center;
  }

  > p {
    ${space({ mt: 2 })};
  }
`;

const EvolveLink = styled.a`
  color: var(--yellow);
  text-decoration: underline;
`;

export const Footer = () => {
  return (
    <StyledFooter px={2} py={3} mt={2}>
      <Stack my={2} px={3}>
        <span>Tech Stack</span>
        <List>
          <li>GitHub's GraphQL</li>
          <li>CodeWars REST API</li>
          <li>Tokei. Count your code, quickly</li>
          <li>Recursive Font Face, from Google Fonts</li>
          <li>React</li>
          <li>NodeJS</li>
          <li>Next.js</li>
        </List>
      </Stack>
      <Notice>
        <p>
          I am a software developer at{" "}
          <strong>
            <EvolveLink
              href="https://evolvetechnology.se"
              target="_blank"
              rel="noreferrer noopener"
            >
              Evolve Technology Sweden AB
            </EvolveLink>
          </strong>
          .
        </p>
        <p>
          We believe great software will actually change the world!{" "}
          <strong>
            <EvolveLink
              href="https://evolvetechnology.se/en/contact"
              target="_blank"
              rel="noreferrer noopener"
            >
              Contact us!
            </EvolveLink>
          </strong>
        </p>
      </Notice>
      <FooterNav my={2} px={3}>
        <Stack>
          <List>
            {entries.map(({ href, title }) => (
              <li key={href}>
                <Link href={href}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/icyJoseph"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/icyjoseph"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://dev.to/icyjoseph"
                target="_blank"
                rel="noreferrer noopener"
              >
                dev.to
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@icjoseph"
                target="_blank"
                rel="noreferrer noopener"
              >
                Medium
              </a>
            </li>
          </List>
        </Stack>
      </FooterNav>
      <CopyrightNotice>
        &#169; {new Date().getFullYear()} Joseph Chamochumbi - Gothenburg,
        Sweden
      </CopyrightNotice>
    </StyledFooter>
  );
};

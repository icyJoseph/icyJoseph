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

const List = styled.ul`
  ${space};

  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 1;
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

  > p {
    ${space({ mt: 2 })};
  }
`;

export const Footer = () => {
  return (
    <StyledFooter px={2} py={3} mt={2}>
      <List my={2} px={3}>
        Tech Stack
        <li>GitHub's GraphQL.</li>
        <li>CodeWars REST API.</li>
        <li>Tokei. Count your code, quickly.</li>
        <li>Recursive Font Face, from Google Fonts.</li>
        <li>React</li>
        <li>NodeJS</li>
        <li>Next.js</li>
      </List>
      <Notice>
        <p>
          I am a software developer at{" "}
          <strong>Evolve Technology Sweden AB</strong>.
        </p>
        <p>
          We believe great software will actually change the world! Come join
          us!
        </p>
      </Notice>
      <FooterNav my={2} px={3}>
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
      </FooterNav>
      <CopyrightNotice>
        &#169; {new Date().getFullYear()} Joseph Chamochumbi - Gothenburg,
        Sweden
      </CopyrightNotice>
    </StyledFooter>
  );
};

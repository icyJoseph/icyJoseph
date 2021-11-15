import Link from "next/link";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

import { entries } from "composition/Navigation";
import { maxWidthUtility } from "styles/mixins";

const StyledFooter = styled.footer<SpaceProps>`
  ${space};
  background: var(--softDark);
  color: var(--smokeyWhite);
`;

const StyledSection = styled.section`
  ${maxWidthUtility};
  ${space({ m: "0 auto" })};

  /* IE11 fallback */
  display: -ms-grid;
  -ms-grid-columns: 1fr 1fr 1fr 1fr;
  column-gap: 2rem;

  display: grid;
  grid-template-columns: repeat(4, minmax(min-content, 1fr));
  grid-column-gap: 2rem;
`;

const CopyrightNotice = styled.span`
  /* IE11 fallback */
  display: block;
  -ms-grid-column-span: 4;
  grid-row: 2;
  -ms-grid-row: 2;

  grid-column: span 4;
  text-align: center;

  margin-top: 16px;
`;

const Stack = styled.div`
  ${space};

  /* IE11 fallback */
  -ms-grid-column-span: 2;
  grid-column: span 2;

  @media (min-width: 768px) {
    /* IE11 fallback */
    -ms-grid-column-span: 1;
    grid-column: span 1;
  }
`;

const List = styled.ul`
  > li {
    ${space({ my: 2 })};
    font-weight: 300;
  }
`;

const FooterNav = styled.nav`
  ${space};

  /* IE11 fallback */
  -ms-grid-column: 4;

  grid-column: 2 / 4;
  text-align: center;

  @media (min-width: 768px) {
    /* IE11 fallback */
    -ms-grid-column-span: 1;

    grid-column: span 1;
    text-align: end;
  }
`;

const Notice = styled.section`
  /* IE11 fallback */
  display: block;
  -ms-grid-column-span: 2;
  -ms-grid-column: 2;

  grid-column: span 2;
  text-align: start;

  @media (min-width: 768px) {
    text-align: center;
  }

  > p {
    ${space({ mt: 2 })};
    font-weight: 300;
  }
`;

const EvolveLink = styled.a`
  color: var(--yellow);
  text-decoration: underline;
  font-weight: 500;
`;

export const Footer = () => {
  return (
    <StyledFooter px={2} py={3} mt={2}>
      <StyledSection>
        <Stack>
          Tech Stack
          <List>
            <li>GitHub&apos;s GraphQL API</li>
            <li>CodeWars&apos; REST API</li>
            <li>Fitbit&apos;s API</li>
            <li>Tokei</li>
            <li>React</li>
            <li>NodeJS</li>
            <li>Next.js</li>
            <li>Recursive Font Face</li>
          </List>
        </Stack>
        <Notice>
          <p>
            I am a software developer at{" "}
            <EvolveLink
              href="https://evolvetechnology.se"
              target="_blank"
              rel="noreferrer noopener"
            >
              Evolve Technology Sweden AB
            </EvolveLink>
            .
          </p>
          <p>
            We believe great software will actually change the world!{" "}
            <EvolveLink
              href="https://evolvetechnology.se/en/contact"
              target="_blank"
              rel="noreferrer noopener"
            >
              Contact us!
            </EvolveLink>
          </p>
        </Notice>
        <FooterNav>
          <Stack>
            Hot Links
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
      </StyledSection>
    </StyledFooter>
  );
};

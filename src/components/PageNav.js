import { Children, Fragment } from "react";
import Link from "next/link";
import styled from "styled-components";
import { space } from "@styled-system/space";

const StyledNav = styled.nav`
  ${space({ mt: 3, p: 2, mx: "auto" })};
  background: var(--smokeyWhite);
  max-width: 85ch;
`;

const PageLinks = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const PageLink = styled.li`
  ${space({ mr: 2 })};
  text-decoration: underline;
  color: var(--blue);
`;

export const PageNav = ({ children }) => {
  return (
    <Fragment>
      <StyledNav>
        <PageLinks>
          {Children.map(children, ({ props: { name } }) => {
            if (!name) return null;
            return (
              <PageLink>
                <Link href={`/#${name}`}>
                  <a>{name}</a>
                </Link>
              </PageLink>
            );
          })}
        </PageLinks>
      </StyledNav>
      {children}
    </Fragment>
  );
};

import { Children, Fragment, isValidElement, ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { space } from "@styled-system/space";

const StyledNav = styled.nav`
  ${space({ py: [5, 4] })};
  font-family: Recursive, sans-serif;
`;

const PageLinks = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const PageLink = styled.li`
  ${space({ mr: 2 })};
  text-decoration: underline;
  color: var(--smokeyWhite);
`;

export const PageNav = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <StyledNav>
        <PageLinks>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;

            const { name } = child.props;
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

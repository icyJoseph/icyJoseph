import { Children, Fragment, isValidElement, ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { space } from "@styled-system/space";
import { maxWidthUtility } from "styles/mixins";

const StyledNav = styled.nav`
  ${maxWidthUtility};
  ${space({ mt: 3, py: 2 })};
  background: var(--smokeyWhite);
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
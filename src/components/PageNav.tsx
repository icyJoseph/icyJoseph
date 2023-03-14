import { Children, Fragment, isValidElement, ReactNode } from "react";

import Link from "next/link";

import {
  ContentNav,
  ContentLinks,
  ContentLink,
} from "design-system/Navigation";

export const PageNav = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <ContentNav>
        <ContentLinks>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;

            const { name } = child.props;
            if (!name) return null;

            return (
              <ContentLink>
                <Link href={`/#${name}`}>{name}</Link>
              </ContentLink>
            );
          })}
        </ContentLinks>
      </ContentNav>

      {children}
    </Fragment>
  );
};

import { Children, Fragment, isValidElement, type ReactNode } from "react";

import Link from "next/link";

export const PageNav = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <nav className="font-sans pb-12 sm:pb-10">
        <ul className="flex justify-around flex-wrap gap-4">
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;
            if (!child.props.name) return null;

            const { name } = child.props;

            return (
              <li className="underline">
                <Link href={`/#${name}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {children}
    </Fragment>
  );
};

import { Children, Fragment, isValidElement, type ReactNode } from "react";

import Link from "next/link";

export const PageNav = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <nav className="font-sans pb-12 sm:pb-10">
        <ul className="flex justify-around flex-wrap gap-4">
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;
            if (typeof child.props !== "object") return child;
            if (child.props == null) return child;

            const props = child.props as Record<string, unknown>;
            if (!props.name) return child;

            const name = props?.name;

            if (typeof name !== "string") return child;

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

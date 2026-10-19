import type { ReactNode } from "react";

import classNames from "classnames";

export const Keyword = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <b className={classNames("inline font-normal text-pale-blue", className)}>
    {children}
  </b>
);

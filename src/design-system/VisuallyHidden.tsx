import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";

export const VisuallyHidden = ({
  className,
  ...delegated
}: ComponentPropsWithoutRef<"span">) => (
  <span className={classNames("sr-only", className)} {...delegated} />
);

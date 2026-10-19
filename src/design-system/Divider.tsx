import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";

export const Divider = (props: ComponentPropsWithoutRef<"hr">) => (
  <hr
    className={classNames(
      "border-t border-t-solid border-shade-mid/80",
      props.className,
    )}
  />
);

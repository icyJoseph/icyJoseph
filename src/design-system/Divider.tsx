import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";

export const Divider = (props: ComponentPropsWithoutRef<"hr">) => (
  <hr
    className={classNames(
      "border-t-white/30 border-t-solid border-t-1",
      props.className
    )}
  />
);

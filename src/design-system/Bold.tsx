import { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";

export const Bold = (props: ComponentPropsWithoutRef<"b">) => (
  <b
    {...props}
    className={classNames("inline font-medium text-inherit", props.className)}
  />
);

import type { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import { bolder } from "design-system/styles/utility.css";

export const Experience = (props: ComponentPropsWithoutRef<"b">) => (
  <b {...props} className={classnames(props.className, bolder)} />
);

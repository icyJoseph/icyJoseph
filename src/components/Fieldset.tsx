import { type ComponentProps, type ReactNode, useId } from "react";

import classNames from "classnames";

import style from "design-system/select.module.css";

export const Fieldset = ({
  className,
  ...rest
}: ComponentProps<"fieldset">) => {
  return <fieldset className={classNames(style.field, className)} {...rest} />;
};

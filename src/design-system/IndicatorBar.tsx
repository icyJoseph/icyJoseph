import type { ComponentPropsWithoutRef } from "react";

import classNames from "classnames";

type IndicatorBarProps = { color: string };

export const IndicatorBar = ({
  color,
  className,
}: IndicatorBarProps & ComponentPropsWithoutRef<"span">) => (
  <span
    className={classNames("inline-block h-2 w-2 rounded-full", className)}
    style={{ backgroundColor: color }}
  />
);

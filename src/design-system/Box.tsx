import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import classnames from "classnames";

import { Sprinkles, sprinkles } from "design-system/styles/sprinkles.css";

export type BoxProps = Pick<
  ComponentPropsWithoutRef<"div">,
  "className" | "children"
> &
  Sprinkles;

const BaseBox = ({ className, children, ...rest }: BoxProps) => {
  return (
    <div className={classnames(className, sprinkles(rest))}>{children}</div>
  );
};

export const Box = styled(BaseBox)``;

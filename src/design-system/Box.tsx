import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { Sprinkles, sprinkles } from "design-system/styles/sprinkles.css";

type BoxOwnProps = Pick<
  ComponentPropsWithoutRef<"div">,
  "className" | "children"
> &
  Sprinkles;

const BaseBox = ({ className, children, ...rest }: BoxOwnProps) => {
  return <div className={`${className} ${sprinkles(rest)}`}>{children}</div>;
};

export const Box = styled(BaseBox)``;

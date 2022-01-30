import { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import {
  backgroundWaves,
  isolatedLayout
} from "design-system/styles/Background.css";

export const Background = (props: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={classnames(props.className, backgroundWaves)} />
);

type LayoutTags = "main" | "div" | "section";

export const IsolatedLayout = (
  props: ComponentPropsWithoutRef<LayoutTags> & { renderAs?: LayoutTags }
) => {
  const Tag = props.renderAs || "div";
  return (
    <Tag {...props} className={classnames(props.className, isolatedLayout)} />
  );
};

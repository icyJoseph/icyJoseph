import { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import {
  backgroundWaves,
  isolatedLayout
} from "design-system/styles/Background.css";

export const Background = (props: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={classnames(props.className, backgroundWaves)} />
);

export const IsolatedLayout = (props: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={classnames(props.className, isolatedLayout)} />
);

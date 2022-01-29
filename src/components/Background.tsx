import { ComponentPropsWithoutRef } from "react";
import {
  backgroundWaves,
  isolatedLayout
} from "design-system/styles/Background.css";

export const Background = (props: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={`${props.className} ${backgroundWaves}`} />
);

export const IsolatedLayout = (props: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={`${props.className} ${isolatedLayout}`} />
);

import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { Property } from "csstype";

type Boxes = keyof Pick<JSX.IntrinsicElements, "div" | "section">;

type SizeProps = { $width?: Property.Width; $height?: Property.Height };
type LayoutProps = { $display?: Property.Display };

type BoxProps<T extends Boxes | ElementType> = { as?: T } & SizeProps &
  LayoutProps &
  ComponentPropsWithoutRef<"div">;

export const Box = <T extends ElementType = "div">({
  as: renderAs,
  $width,
  $height,
  $display,
  ...props
}: BoxProps<T>) => {
  const Tag = renderAs || "div";

  return (
    <Tag
      {...props}
      style={{
        ...props.style,
        width: $width,
        height: $height,
        display: $display,
      }}
    />
  );
};

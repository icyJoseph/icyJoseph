import type { ComponentPropsWithoutRef } from "react";
import type { Property } from "csstype";

import styled from "styled-components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classnames from "classnames";

import { textClassName, textTheme } from "design-system/styles/Text.css";
import { sprinkles, Sprinkles } from "design-system/styles/sprinkles.css";
import { theme } from "styles/theme.css";

type TextBaseProps = Sprinkles & {
  $verticalAlign?: Property.VerticalAlign;
  $textTransform?: Property.TextTransform;
  $textAlign?: Property.TextAlign;

  fontSize?: Property.FontSize;
  fontWeight?: Property.FontWeight;
  textColor?: string;
};

type TextProps = TextBaseProps & {
  renderAs?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & ComponentPropsWithoutRef<"p">;

type TimeTextProps = TextBaseProps & {
  renderAs: "time";
} & ComponentPropsWithoutRef<"time">;

const BaseText = ({
  $verticalAlign,
  $textAlign,
  $textTransform,

  fontSize,
  textColor,
  fontWeight,

  renderAs = "p",

  mx,
  my,
  mr,
  ml,
  m,
  mt,
  mb,
  p,
  pr,
  pl,
  px,
  py,
  pt,
  pb,
  className,
  ...rest
}: TextProps | TimeTextProps) => {
  const Tag = renderAs;

  const sprinkle = sprinkles({
    mx,
    my,
    mr,
    ml,
    m,
    mt,
    mb,
    p,
    pr,
    pl,
    px,
    py,
    pt,
    pb
  });

  return (
    <Tag
      {...rest}
      className={classnames(className, textClassName, sprinkle)}
      style={assignInlineVars(textTheme, {
        fontWeight: `${fontWeight || 400}`,
        color: `var(${textColor})` || theme.colors.smokeyWhite,
        fontSize: fontSize || "1.6rem"
      })}
    />
  );
};

export const Text = styled(BaseText)<TextProps | TimeTextProps>`
  text-align: ${({ $textAlign }) => $textAlign};
  vertical-align: ${({ $verticalAlign }) => $verticalAlign};
  text-transform: ${({ $textTransform = "unset" }) => $textTransform};
`;

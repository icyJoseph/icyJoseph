import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import type { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { textClassName, textTheme } from "design-system/text.css";
import { theme } from "styles/theme.css";

type TextBaseProps = SpaceProps & {
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
  margin,
  padding,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginX,
  marginY,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
  className,
  ...rest
}: TextProps | TimeTextProps) => {
  const Tag = renderAs;

  return (
    <Tag
      {...rest}
      className={className + " " + textClassName}
      style={assignInlineVars(textTheme, {
        fontWeight: `${fontWeight || 400}`,
        color: `var(${textColor})` || theme.colors.smokeyWhite,
        fontSize: fontSize || "1.6rem"
      })}
    />
  );
};

export const Text = styled(BaseText)<TextProps | TimeTextProps>`
  ${space};
  text-align: ${({ $textAlign }) => $textAlign};
  vertical-align: ${({ $verticalAlign }) => $verticalAlign};
  text-transform: ${({ $textTransform = "unset" }) => $textTransform};
`;

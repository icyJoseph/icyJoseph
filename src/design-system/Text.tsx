import styled from "styled-components";
import type { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";
import { ComponentPropsWithoutRef } from "react";

type BaseTextProps = {
  $verticalAlign?: Property.VerticalAlign;
  $display?: Property.Display;
  $fontSize?: Property.FontSize;
  $fontWeight?: Property.FontWeight;
  $textAlign?: Property.TextAlign;
  $textTransform?: Property.TextTransform;
  $textColor?: string;
};

const BaseText = ({
  $fontSize,
  $textAlign,
  $textColor,
  $fontWeight,
  $textTransform,
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
  ...rest
}: SpaceProps & TextProps & ComponentPropsWithoutRef<"p">) => <p {...rest} />;

type TextProps = SpaceProps & BaseTextProps & ComponentPropsWithoutRef<"p">;

export const Text = styled(BaseText)<TextProps>`
  ${space};
  font-family: Recursive, sans-serif;
  display: ${({ $display }) => $display};
  font-size: ${({ $fontSize = "1.6rem" }) => $fontSize};
  text-align: ${({ $textAlign }) => $textAlign};
  vertical-align: ${({ $verticalAlign }) => $verticalAlign};
  color: ${({ $textColor = "--smokeyWhite" }) => `var(${$textColor})`};
  font-weight: ${({ $fontWeight = 400 }) => $fontWeight ?? 400};
  text-transform: ${({ $textTransform = "unset" }) => $textTransform};
`;

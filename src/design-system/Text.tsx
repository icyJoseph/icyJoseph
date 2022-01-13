import styled from "styled-components";
import type { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";
import { ComponentPropsWithoutRef } from "react";

type TextProps = {
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

export const Text = styled(BaseText)`
  ${space};
  font-size: ${({ $fontSize = "1.6rem" }) => $fontSize};
  text-align: ${({ $textAlign = "unset" }) => $textAlign};
  color: ${({ $textColor = "--black", theme }) =>
    `var(${$textColor}, ${theme.white})`};
  font-weight: ${({ $fontWeight = 400 }) => $fontWeight ?? 400};
  text-transform: ${({ $textTransform = "unset" }) => $textTransform};
`;

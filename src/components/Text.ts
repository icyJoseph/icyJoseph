import styled from "styled-components";
import { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";

type TextProps = {
  fontSize?: Property.FontSize;
  fontWeight?: Property.FontWeight;
  textAlign?: Property.TextAlign;
  textTransform?: Property.TextTransform;
};

export const Text = styled.p<SpaceProps & TextProps>`
  ${space};
  font-size: ${({ fontSize = "1.6rem" }) => fontSize};
  text-align: ${({ textAlign = "unset" }) => textAlign};
  color: ${({ color = "--black", theme }) => `var(${color}, ${theme.white})`};
  font-weight: ${({ fontWeight = 400 }) => fontWeight ?? 400};
  text-transform: ${({ textTransform = "unset" }) => textTransform};
  line-height: 1.2;
`;

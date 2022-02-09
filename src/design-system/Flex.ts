import styled from "styled-components";
import type { Property } from "csstype";
import { space, type SpaceProps } from "@styled-system/space";

type BaseFlexProps = {
  flexWrap?: Property.FlexWrap;
  flexDirection?: Property.FlexDirection;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  flex?: Property.Flex;
  gap?: Property.Gap;
  $width?: Property.Width;
};

export type FlexProps = SpaceProps & BaseFlexProps;

export const Flex = styled.div<FlexProps>`
  ${space};
  display: flex;
  flex-wrap: ${({ flexWrap = "wrap" }) => flexWrap};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex }) => flex};
  gap: ${({ gap }) => gap};
  width: ${({ $width }) => $width};
`;

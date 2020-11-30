import styled from "styled-components";
import { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";

export type FlexProps = {
  flexWrap?: Property.FlexWrap;
  flexDirection?: Property.FlexDirection;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  flex?: Property.Flex;
};

export const Flex = styled.div<SpaceProps & FlexProps>`
  ${space};
  display: flex;
  flex-wrap: ${({ flexWrap = "wrap" }) => flexWrap};
  flex-direction: ${({ flexDirection = "unset" }) => flexDirection};
  justify-content: ${({ justifyContent = "unset" }) => justifyContent};
  align-items: ${({ alignItems = "unset" }) => alignItems};
  flex: ${({ flex = "unset" }) => flex};
`;

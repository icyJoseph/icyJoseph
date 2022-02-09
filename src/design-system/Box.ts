import type { Property } from "csstype";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

type SizeProps = { $width?: Property.Width; $height?: Property.Height };
type LayoutProps = { $display?: Property.Display };

type BoxProps = SpaceProps & SizeProps & LayoutProps;

export const Box = styled.div<BoxProps>`
  ${space};

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: ${({ $display }) => $display};
`;

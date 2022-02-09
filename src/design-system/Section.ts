import type { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

type SectionProps = ComponentPropsWithRef<"section"> & SpaceProps;
type HeaderProps = ComponentPropsWithRef<"header"> & SpaceProps;

export const Section = styled.section<SectionProps & { $row?: string }>`
  ${space({ my: 3, px: 2 })};
  ${space};

  -ms-grid-row: ${(props) => props.$row};
`;

export const SectionHeader = styled.header<HeaderProps>`
  ${space({ pt: 4 })};
  ${space}
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;

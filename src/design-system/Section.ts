import type { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

type SectionProps = ComponentPropsWithRef<"section"> & SpaceProps;
type HeaderProps = ComponentPropsWithRef<"header"> & SpaceProps;

export const Section = styled.section<SectionProps>`
  ${space({ my: 3, px: 2 })};
  ${space};
`;

export const SectionHeader = styled.header<HeaderProps>`
  ${space({ pt: 4 })};
  ${space}
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;
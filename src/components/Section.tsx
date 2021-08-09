import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";

type SectionOwnProps = { maxWidth?: Property.MaxWidth };

type SectionProps = PropsWithChildren<SpaceProps & SectionOwnProps>;

const BaseSection = (props: SectionProps) => <section {...props} />;

export const Section = styled(BaseSection)`
  ${space({ mx: "auto", my: 3 })};
  ${space};
  max-width: ${({ maxWidth }) => maxWidth ?? "85ch"};
`;

export const SectionHeader = styled.header<SpaceProps>`
  ${space({ pt: 4 })};
  ${space}
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;

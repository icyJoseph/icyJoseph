import { PropsWithChildren } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

type SectionProps = PropsWithChildren<SpaceProps>;

const BaseSection = (props: SectionProps) => <section {...props} />;

export const Section = styled(BaseSection)`
  ${space({ my: 3, px: 2 })};
  ${space};
`;

export const SectionHeader = styled.header<SpaceProps>`
  ${space({ pt: 4 })};
  ${space}
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;

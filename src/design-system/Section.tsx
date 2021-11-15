import { PropsWithChildren } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";
import { maxWidthUtility } from "styles/mixins";

type SectionProps = PropsWithChildren<SpaceProps>;

const BaseSection = (props: SectionProps) => <section {...props} />;

export const Section = styled(BaseSection)`
  ${maxWidthUtility};
  ${space({ mx: "auto", my: 3 })};
  ${space};
`;

export const SectionHeader = styled.header<SpaceProps>`
  ${space({ pt: 4 })};
  ${space}
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;

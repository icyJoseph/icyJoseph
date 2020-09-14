import styled from "styled-components";
import { space } from "@styled-system/space";

export const Section = styled.section`
  ${space}
`;

export const FullPage = styled(Section)`
  min-height: 100vh;
`;

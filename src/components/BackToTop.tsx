import styled from "styled-components";
import { space } from "@styled-system/space";

export const Base = styled.a`
  ${space({ my: 2 })};
  text-decoration: underline;
  font-size: 1.4rem;
`;

export const BackToTop = () => <Base href="#">Back to top</Base>;

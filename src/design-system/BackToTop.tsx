import styled from "styled-components";
import { space } from "@styled-system/space";

export const Base = styled.div`
  ${space({ mt: 4 })};
  text-align: right;

  & > a {
    font-family: Recursive, sans-serif;
    text-decoration: underline;
    font-size: 1.4rem;
    color: var(--smokeyWhite);
  }
`;

export const BackToTop = () => (
  <Base>
    <a href="#">Back to top</a>
  </Base>
);

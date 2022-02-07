import styled from "styled-components";
import { space } from "@styled-system/space";

const Base = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <a href="#">Back to top</a>
  </div>
);

export const BackToTop = styled(Base)`
  ${space({ mt: 4 })};
  text-align: right;

  & > a {
    font-family: Recursive, sans-serif;
    text-decoration: underline;
    font-size: 1.4rem;
    color: var(--smokeyWhite);
  }
`;

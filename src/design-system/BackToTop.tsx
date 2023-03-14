import { space } from "@styled-system/space";
import Link from "next/link";
import styled from "styled-components";

const Base = ({
  className = "",
  to,
  label,
}: {
  className?: string;
  to: string;
  label: string;
}) => (
  <div className={className}>
    <Link href={to}>{label}</Link>
  </div>
);

const StyledBase = styled(Base)`
  ${space({ mt: 4 })};
  text-align: right;

  & > a {
    font-family: Recursive, sans-serif;
    text-decoration: underline;
    font-size: 1.6rem;
    color: var(--smokeyWhite);
  }
`;

export const BackToTop = () => <StyledBase to="#" label="Back to top" />;

export const BackTo = ({ to, label }: { to: string; label: string }) => (
  <StyledBase to={to} label={label} />
);

import styled from "styled-components";
import { space } from "@styled-system/space";

export const Card = styled.div`
  ${space({ py: 3, px: 2 })}
  background:var(--softDark);
  color: var(--white);
  border-radius: 6px;
  position: relative;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 12px rgba(0, 0, 0, 0.23);

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    border-radius: 6px;
    box-shadow: 0 9px 18px rgba(0, 0, 0, 0.3), 0 9px 18px rgba(0, 0, 0, 0.22);
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
`;

Card.Header = styled.header`
  font-size: 2rem;
  font-weight: 300;
`;

const Base = ({ as = "span", className, children }) => {
  const Element = as;
  return <Element className={className}>{children}</Element>;
};

Card.SubHeader = styled(Base)`
  ${space({ mt: 2 })};
  font-size: 1.8rem;
  text-transform: lowercase;
  text-align: center;
`;

Card.Section = styled.section`
  ${space({ mt: 3 })};
  display: flex;
  flex-wrap: wrap;
  flex-basis: 33%;

  @media (min-width: 375px) {
    flex-wrap: nowrap;
  }
`;

Card.Footer = styled.footer`
  ${space({ mt: 3 })}
`;

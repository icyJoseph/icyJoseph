import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Property } from "csstype";
import { space, SpaceProps } from "@styled-system/space";

const StyledCard = styled.div<SpaceProps>`
  ${space({ py: 3, px: 3 })};
  ${space}
  background:var(--softDark);
  color: var(--white);
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

export const Card = (props: PropsWithChildren<SpaceProps>) => (
  <StyledCard {...props} />
);

Card.Header = styled.header`
  font-size: 2rem;
  font-weight: 300;
`;

Card.SubHeader = styled.span<{ textTransform?: Property.TextTransform }>`
  ${space({ mt: 2 })};
  font-size: 1.8rem;
  text-transform: ${({ textTransform = "lowercase" }) => textTransform};
  text-align: center;
`;

Card.Section = styled.section`
  ${space({ mt: 4 })};
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

export const InfoCard = styled(Card)`
  width: 80%;
  max-width: unset;
  min-width: unset;

  @media (min-width: 320px) {
    max-width: 328px;
    min-width: 280px;
    width: 33.33%;
  }

  @media (min-width: 375px) {
    min-width: 300px;
  }
`;

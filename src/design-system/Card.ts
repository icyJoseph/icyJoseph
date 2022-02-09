import type { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { space, type SpaceProps } from "@styled-system/space";

import { theme } from "design-system/Global/theme";

export type CardProps = ComponentPropsWithRef<"div"> & SpaceProps;

export const BaseCard = styled.div<CardProps>`
  font-family: Recursive, sans-serif;
  ${space({ py: 3, px: 3 })};

  ${space};

  background: ${theme.softDark};
  background: var(--softDark);

  color: var(--smokeyWhite);

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

export const Header = styled.header`
  font-size: 2rem;
  font-weight: 300;
`;

export const Section = styled.section`
  ${space({ mt: 4 })};
  display: flex;
  flex-wrap: wrap;
  flex-basis: 33%;

  @media (min-width: 375px) {
    flex-wrap: nowrap;
  }
`;

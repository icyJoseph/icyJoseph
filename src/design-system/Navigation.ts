import styled from "styled-components";
import { space } from "@styled-system/space";

export const Nav = styled.nav`
  font-family: Recursive, sans-serif;
  ${space({ py: 2, my: 0 })};
  display: flex;
  flex-direction: column;
  background: transparent;

  color: var(--smokeyWhite);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Brand = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  ${space({ px: 2 })};

  & span {
    display: block;
    font-size: 1.4rem;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    ${space({ px: 0 })};
  }
`;

export const Spacer = styled.div`
  margin: 0 auto;
  display: none;
  flex: auto;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const LinkList = styled.ul`
  ${space({ mt: 2 })};
  display: flex;
  flex: auto;
  justify-content: space-evenly;
  align-items: center;

  @media (min-width: 768px) {
    ${space({ mt: 0 })};
  }
`;

export const LinkItem = styled.li`
  display: inline-flex;
  flex: 1;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export const ContentNav = styled.nav`
  ${space({ py: [5, 4] })};
  font-family: Recursive, sans-serif;
  -ms-grid-row: 1;
`;

export const ContentLinks = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const ContentLink = styled.li`
  ${space({ mr: 2 })};
  text-decoration: underline;
  color: var(--smokeyWhite);
`;

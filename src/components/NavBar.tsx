import styled from "styled-components";
import { space } from "@styled-system/space";
import { ComponentPropsWithoutRef } from "react";

const Nav = styled.nav`
  font-family: "Fira Code", monospace;
  ${space({ py: 2, my: 0 })};
  display: flex;
  flex-direction: column;
  background: transparent;

  color: var(--smokeyWhite);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const NavBar = (props: ComponentPropsWithoutRef<"nav">) => <Nav {...props} />;

NavBar.Brand = styled.div`
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

NavBar.Spacer = styled.div`
  margin: 0 auto;
  display: none;
  flex: auto;

  @media (min-width: 768px) {
    display: flex;
  }
`;

NavBar.LinkList = styled.ul`
  ${space({ mt: 2 })};
  display: flex;
  flex: auto;
  justify-content: space-evenly;
  align-items: center;

  @media (min-width: 768px) {
    ${space({ mt: 0 })};
  }
`;

NavBar.LinkItem = styled.li`
  display: inline-flex;
  flex: 1;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export { NavBar };

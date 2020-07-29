import styled from "styled-components";
import { space } from "@styled-system/space";

export const NavBar = styled.nav`
  ${space({ py: 2, px: 3 })}
  display: flex;
  flex-direction: column;
  background: var(--white);
  color: var(--lightDark);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

NavBar.Brand = styled.span`
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  flex: 1;
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
  justify-content: space-around;
  max-width: unset;

  @media (min-width: 768px) {
    ${space({ mt: 0 })};
    max-width: 33.33%;
  }
`;

NavBar.LinkItem = styled.li`
  display: inline-flex;
  justify-content: center;
`;

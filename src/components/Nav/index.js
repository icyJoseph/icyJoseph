import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  padding: 0.5em;

  > * > img {
    width: auto;
    height: 100%;
  }

  > *:first-child {
    max-height: 50px;
  }

  > * {
    align-items: center;
    display: flex;
  }

  > * + * {
    flex: 1;
  }

  > * > * {
    cursor: pointer;
    margin: 0 1em;
  }
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  margin: auto;

  > * {
    height: 40px;
    width: 40px;
  }

  > * > button {
    background: none !important;
    height: 100%;
    width: 100%;
    color: inherit;
    border: none;
    padding: 0 !important;
    font: inherit;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
    outline-color: gray;
    box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.8),
      1px 2px 1px rgba(0, 0, 0, 0.8);

    &:focus {
      /* add outline to focus pseudo-class */
      outline-style: dotted;
      outline-width: 1px;
    }
  }

  @supports (-moz-appearance: none) {
    /* Mozilla-only */
    > * > button {
      &:-moz-focus-inner {
        /* reset any predefined properties */
        border: none;
        padding: 0;
      }
    }
  }
`;

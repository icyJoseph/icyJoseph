import styled, { css } from "styled-components";

const ImageLength = "50px";

const shadow = css`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &.active,
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &:active {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.05), 0 0px 0px rgba(0, 0, 0, 0.02);
  }
`;

export const NavBar = styled.nav`
  display: flex;
  padding: 0.5em;

  > div {
    flex: 1;
  }

  > * > img {
    display: none;

    @media (min-width: 600px) {
      display: block;
      max-width: ${ImageLength};
      width: auto;
      height: 100%;
      ${shadow}
      border-radius: 50%;
      margin: 0 0.5em;
    }
  }

  > * > span {
    font-weight: 900;
    transition: color 0.3s;
    color: black;
    position: relative;
    padding: 10px 0;
    flex: 1;
  }

  > *:first-child {
    max-height: ${ImageLength};
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

  @media (max-width: 599px) {
    padding-bottom: 1em;
    flex-direction: column;

    > div {
      text-align: center;
    }

    > ul {
      padding: 0;
    }
  }
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  margin: auto;

  > * {
    height: 35px;
    width: 35px;

    @media (max-width: 599px) {
      height: 50px;
      width: 50px;

      > button {
        font-size: 1.5em;
      }
    }
  }

  > * > button {
    background: none !important;
    height: 100%;
    width: 100%;
    color: inherit;
    border: none;
    padding: 0 !important;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
    outline-color: gray;
    ${shadow}

    &:focus {
      /* add outline to focus pseudo-class */
      outline-style: none;
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

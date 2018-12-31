import styled, { css } from "styled-components";

const shadow = css`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &:active {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.05), 0 0px 0px rgba(0, 0, 0, 0.02);
  }
`;

const underLine = css`
  content: "";
  position: absolute;
  width: 30%;
  height: 5px;
  background: #e3e8dc;
  bottom: 0;
  left: 35%;
  transition: transform 0.5s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
`;

export const NavBar = styled.nav`
  display: flex;
  padding: 0.5em;

  > * > img {
    width: auto;
    height: 100%;
    ${shadow}
    border-radius: 50%;
    margin: 0 0.5em;
  }

  > * > span {
    font-weight: 900;
    transition: color 0.3s;
    color: gray;
    position: relative;
    padding: 10px 0;

    &:before,
    :after {
      ${underLine}
    }

    &:hover:before {
      transform: translate3d(300%, 0, 0) scale3d(0, 1, 1);
    }

    &:hover:after {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }

    &:after {
      background: #acd07a;
      transform: translate3d(-300%, 0, 0) scale3d(0, 1, 1);
    }

    &:hover {
      color: black;
    }

    > span {
      color: black;
      transition: transform 0.5s, color 0.5s;
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      transform: perspective(1000px) rotate3d(0, 1, 0, 180deg);
    }

    &:hover > span {
      transform: perspective(1000px) rotate3d(0, 1, 0, 0deg);
      color: gray;
    }
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
    height: 35px;
    width: 35px;
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

import React from "react";
import styled from "styled-components";
import { baseColors } from "../../theme";

const StyledTitle = styled.div`
  background: ${baseColors.background};
  min-width: ${({ shadow }) => (shadow ? "150px" : "100px")};
  border-radius: 0 0 5px 5px;
  align-self: center;
  transition: all 1s ease;
  z-index: 10;

  box-shadow: ${({ shadow }) =>
    shadow
      ? `0 0px 16px 1px rgba(255,255,255,0.24), 
      0 11px 3px -12px rgba(255,255,255,0.4);`
      : "0px 0px 0px 0px rgba(255,255,255,0);"};

  > div.sticky_sentinel {
    position: absolute;
    left: 0;
    right: 0;
    visibility: hidden;
  }

  > div.sticky_sentinel--top {
    height: 40px;
    top: -30px;
  }

  > div.sticky_sentinel--bottom {
    bottom: 0;
    height: 80px;
  }

  > * {
    margin: 0;
    padding: 0.2em;
    font-size: 1.5em;
    color: ${baseColors.heading};
    text-align: center;
  }
`;

export function Title({ children, ...props }) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}

export default React.memo(Title);

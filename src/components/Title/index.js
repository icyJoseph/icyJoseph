import React from "react";
import styled, { css } from "styled-components";
import { baseColors } from "../../theme";

const stickyElem = ({ sticky, top = "0" }) => css`
position: ${sticky ? "sticky" : ""}
top: ${top};
`;

const titleShadow = css`
  box-shadow: ${({ shadow }) =>
    shadow
      ? `0 0px 16px 1px rgba(255,255,255,0.24), 
      0 11px 3px -12px rgba(255,255,255,0.4);`
      : "0px 0px 0px 0px rgba(255,255,255,0);"};
`;

const StyledTitle = styled.div`
  ${stickyElem}
  background: ${baseColors.background};
  opacity: ${({ shadow }) => (shadow ? "0.9" : "1")};
  ${titleShadow}
  min-width: ${({ shadow }) => (shadow ? "150px" : "100px")} ;
  border-radius: 0 0 5px 5px;
  align-self: center;
  transition: all 1s ease;
  z-index: 10;

  
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

  >div.sticky_sentinel--bottom {
    bottom: 0;
    height: 80px;
  }

  > * {
    margin: 0;
    padding: 0.2em;
    font-size: 16pt;
    color: ${baseColors.heading};
    text-align: center;  
  }
`;

export function Title({ children, ...props }) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}

export default React.memo(Title);

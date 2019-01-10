import React from "react";
import styled, { css } from "styled-components";
import { baseColors } from "../../theme";

const stickyElem = ({ sticky, top = "0" }) => css`
position: ${sticky ? "sticky" : ""}
top: ${top};
`;

const StyledTitle = styled.div`
  ${stickyElem}
  background: ${baseColors.background};

  > * {
    font-size: 20pt;
    color: ${baseColors.heading};
    text-align: center;
  }
`;

export function Title({ children, ...props }) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}

export default React.memo(Title);

import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { baseColors } from "../../theme";
import { useOnline } from "../../containers/Online";

const fade = keyframes`
0% {
  opacity: 0.2;
}

50% {
  opacity: 1;
}

100% {
  opacity: 0.2;
}
`;

const StyledTitle = styled.div`
  background: ${baseColors.background};
  min-width: ${({ shadow }) => (shadow ? "150px" : "100px")};
  border-radius: 0 0 5px 5px;
  align-self: center;
  transition: all 1s ease;
  text-align: center;
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

  > * > * {
    display: inline-block;
    margin: 0;
    padding: 0.2em;
    font-size: 1.5em;
    color: ${baseColors.heading};
    text-align: center;
  }

  .network-fade {
    color: ${baseColors.heading};
    animation: ${fade} 2s ease-in infinite;
  }
`;

const Network = () => (
  <FontAwesomeIcon title="No Internet" icon={faWifi} className="network-fade" />
);

export function Title({ network, children, ...props }) {
  const online = useOnline();

  return (
    <StyledTitle {...props}>
      <span>{children}</span>
      <span>{!online && <Network />}</span>
    </StyledTitle>
  );
}

export default React.memo(Title);

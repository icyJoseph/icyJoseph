import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons/faWifi";
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
  background: ${({ theme }) => theme.background};
  border-radius: 0 0 5px 5px;
  align-self: center;
  transition: all 1s ease;
  text-align: center;

  > * > * {
    display: inline-block;
    margin: 0;
    padding: 0.2em;
    font-size: 1.5em;
    color: ${({ theme }) => theme.heading};
    text-align: center;
  }

  .network-fade {
    color: ${({ theme }) => theme.heading};
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

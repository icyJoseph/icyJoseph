import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: ${({ selected, theme }) => (selected ? theme.warning : theme.info)};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  font-weight: ${({ selected }) => (selected ? "bold" : "unset")};
  background: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
  font-size: 1.5em;
  transition: opacity 1s ease;
`;

function Controls({ length, handler, page, currentTotal }) {
  return Array.from({ length }, (_, i) => {
    const handleClick = () => handler(i);
    return (
      <Button
        key={`${i}-button`}
        selected={i === page}
        disabled={i >= currentTotal}
        onClick={handleClick}
      >
        {i}
      </Button>
    );
  });
}

export default React.memo(Controls);

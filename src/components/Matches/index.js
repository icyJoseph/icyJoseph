import React, { memo } from "react";
import styled from "styled-components";
import useEasing from "use-easing";

const Message = styled.span`
  display: block;
  color: ${({ theme }) => theme.warning};
  font-weight: bold;
  text-align: center;
  margin: 1em;
`;

function Matches({ count }) {
  const { value } = useEasing({
    end: count,
    duration: 1,
    formatFn: x => Math.floor(x)
  });

  return <Message>{value} matches</Message>;
}

export default memo(Matches);

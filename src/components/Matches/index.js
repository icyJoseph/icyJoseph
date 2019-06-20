import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { baseColors } from "../../theme";

const Message = styled.span`
  display: block;
  color: ${baseColors.warning};
  font-weight: bold;
  text-align: center;
  margin: 1em;
`;

function Matches({ count }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timer;
    if (value !== count) {
      timer = setTimeout(
        () => setValue(prev => prev + (count - prev) / Math.abs(prev - count)),
        7
      );
    }
    return () => clearTimeout(timer);
  }, [count, value]);

  return <Message>{value} matches</Message>;
}

export default React.memo(Matches);

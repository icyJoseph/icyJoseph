import React from "react";
import { useCountUp } from "react-countup";
import { StatWrap, StatLabel, StatCount } from "./styled";

export function Stat({ start = 0, end, label }) {
  const { countUp } = useCountUp({ start, end, duration: 5, delay: 1 });
  return (
    <StatWrap>
      <StatLabel>{label}</StatLabel>
      <StatCount>{countUp}</StatCount>
    </StatWrap>
  );
}

export default Stat;

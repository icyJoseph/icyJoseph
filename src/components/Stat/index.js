import React, { memo } from "react";
import { useCountUp } from "react-countup";
import { StatWrap, StatLabel, StatCount } from "./styled";

export function StatCountUp({
  end = 0,
  duration = 5,
  delay = 1,
  onEnd = () => {}
}) {
  const { countUp } = useCountUp({
    start: 0,
    end,
    duration,
    delay,
    onEnd
  });

  return <StatCount>{countUp}</StatCount>;
}

export function Stat({ label = "", end, ...rest }) {
  return (
    <StatWrap>
      <StatLabel>{label}</StatLabel>
      {end && <StatCountUp end={end} {...rest} />}
    </StatWrap>
  );
}

export default memo(Stat);

import React, { Fragment, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHdd } from "@fortawesome/free-solid-svg-icons";
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

export function Stat({ withIcon, label = "", end, ...rest }) {
  return (
    <StatWrap>
      {end && <StatCountUp end={end} {...rest} />}
      <StatLabel>
        {withIcon && (
          <Fragment>
            <FontAwesomeIcon icon={faHdd} />
            <div>bytes in </div>
          </Fragment>
        )}
        {label}
      </StatLabel>
    </StatWrap>
  );
}

export default memo(Stat);

import React, { Fragment, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHdd } from "@fortawesome/free-solid-svg-icons/faHdd";
import useEasing from "use-easing";
import { StatWrap, StatLabel, StatCount } from "./styled";

export function StatCountUp({
  end = 0,
  duration = 1,
  delay = 0,
  onEnd = () => {}
}) {
  const { value } = useEasing({
    start: 0,
    end,
    duration,
    formatFn: x => Math.floor(x),
    onEnd
  });

  return <StatCount>{value}</StatCount>;
}

export function Stat({ withIcon, label = "", end, ...rest }) {
  return (
    !!end && (
      <StatWrap>
        <StatCountUp end={end} {...rest} />
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
    )
  );
}

export default memo(Stat);

import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";

export const TimeLine = ({ timeLine, experience }) => {
  return timeLine.map(({ meta, ...rest }, index) => (
    <Event
      key={meta}
      last={index + 1 === timeLine.length}
      meta={meta}
      experience={experience}
      {...rest}
    />
  ));
};

export default TimeLine;

TimeLine.propTypes = {
  timeLine: PropTypes.array
};

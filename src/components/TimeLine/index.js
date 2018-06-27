import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";

export const TimeLine = ({ data, experience }) => {
  return (
    <div style={{ marginBottom: "120px" }}>
      {data.map(({ meta, ...rest }, index) => (
        <Event
          key={meta}
          last={index + 1 === data.length}
          meta={meta}
          experience={experience}
          {...rest}
        />
      ))}
    </div>
  );
};

export default TimeLine;

TimeLine.propTypes = {
  data: PropTypes.array
};

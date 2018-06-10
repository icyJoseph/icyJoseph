import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";

export const TimeLine = ({ data }) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      {data.map(({ meta, ...rest }, index) => (
        <Event
          key={meta}
          last={index + 1 === data.length}
          meta={meta}
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

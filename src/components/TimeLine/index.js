import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";

export const TimeLine = ({ data }) => {
  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        {data.map((event, index) => (
          <Event key={event.id} left={index % 2 === 0} {...event} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;

TimeLine.propTypes = {
  data: PropTypes.array
};

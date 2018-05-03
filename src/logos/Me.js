import React from "react";
import PropTypes from "prop-types";

const Me = ({ fill, handler }) => {
  return (
    <g
      fill={fill}
      transform="scale(0.012)translate(-350,300)"
      onClick={handler}
      style={{
        cursor: "pointer"
      }}
    >
      <text
        stroke="#000"
        transform="rotate(-30 279.4453124999999,186.42306518554685) matrix(3.5363574959800985,0,0,3.2310659197700176,-245.73786896740947,-260.43491243154347) "
        text-anchor="start"
        font-family="Helvetica, Arial, sans-serif"
        font-size="54"
        y="190"
        x="190"
        stroke-width="0"
        fill={fill}
      >
        About
      </text>
      <text
        stroke="#000"
        transform="rotate(-30 279.4453124999999,186.42306518554685) matrix(3.5363574959800985,0,0,3.2310659197700176,-245.73786896740947,-260.43491243154347) "
        text-anchor="start"
        font-family="Helvetica, Arial, sans-serif"
        font-size="54"
        y="240"
        x="220"
        stroke-width="0"
        fill={fill}
      >
        Me
      </text>
    </g>
  );
};

Me.propTypes = {
  fill: PropTypes.string,
  handler: PropTypes.func
};

export default Me;

import React from "react";
import PropTypes from "prop-types";
import Hexagon from "react-hexagon";

import { curry } from "../../functional";

export const HexGridColumn = ({ tile, clickHandler }) => {
  const { id, Component, fill, backgroundFill } = tile;
  const injectHandlerWithContent = curry(clickHandler)(id);
  return (
    <div>
      <svg
        style={{
          height: "100px",
          width: "100px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Hexagon
          style={{ stroke: "none", fill: backgroundFill }}
          diagonal={100}
          flatTop
          onClick={injectHandlerWithContent}
          children={
            <Component handler={injectHandlerWithContent} fill={fill} />
          }
        />
      </svg>
    </div>
  );
};

export default HexGridColumn;

HexGridColumn.propTypes = {
  tile: PropTypes.shape({
    Component: PropTypes.func,
    fill: PropTypes.string,
    backgroundFill: PropTypes.string,
    Content: PropTypes.func
  }),
  clickHandler: PropTypes.func
};

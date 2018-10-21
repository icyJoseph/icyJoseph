import React from "react";
import PropTypes from "prop-types";
import { curry } from "../../functional";

export const DockIcon = ({ tile, clickHandler }) => {
  const { id, Component, fill } = tile;
  const injectHandlerWithContent = curry(clickHandler)(id);
  return (
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
      <Component handler={injectHandlerWithContent} fill={fill} />
    </svg>
  );
};

export default DockIcon;

DockIcon.propTypes = {
  tile: PropTypes.shape({
    Component: PropTypes.func,
    fill: PropTypes.string,
    backgroundFill: PropTypes.string,
    Content: PropTypes.func
  }),
  clickHandler: PropTypes.func
};

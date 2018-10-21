import React from "react";
import PropTypes from "prop-types";
import DockIcon from "./DockIcon";

export const Dock = ({ items, clickHandler }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {items.map(tile => (
        <DockIcon key={tile.id} clickHandler={clickHandler} tile={tile} />
      ))}
    </div>
  );
};

export default Dock;

Dock.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func
};

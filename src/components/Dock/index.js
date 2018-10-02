import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

export const HexGrid = ({ items, clickHandler }) => {
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
        <Icon key={tile.id} clickHandler={clickHandler} tile={tile} />
      ))}
    </div>
  );
};

export default HexGrid;

HexGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func
};

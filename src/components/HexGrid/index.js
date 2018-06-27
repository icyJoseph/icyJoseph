import React from "react";
import PropTypes from "prop-types";
import HexGridRow from "./HexGridRow";

export const HexGrid = ({ rows, clickHandler }) => {
  return (
    <div
      style={{
        flex: 4,
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      {rows.map((row, i) => (
        <HexGridRow key={`GridRow${i}`} row={row} clickHandler={clickHandler} />
      ))}
    </div>
  );
};

export default HexGrid;

HexGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func
};

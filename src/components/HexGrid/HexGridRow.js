import React from "react";
import PropTypes from "prop-types";
import HexGridColumn from "./HexGridColumn";

export const HexGridRow = ({ row, clickHandler }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {row.map(tile => (
        <HexGridColumn key={tile.id} clickHandler={clickHandler} tile={tile} />
      ))}
    </div>
  );
};
export default HexGridRow;

HexGridRow.propTypes = {
  rows: PropTypes.arrayOf({
    row: PropTypes.array
  }),
  clickHandler: PropTypes.func
};

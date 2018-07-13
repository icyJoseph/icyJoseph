import React from "react";
import PropTypes from "prop-types";
import HexGridRow from "./HexGridRow";
import { HexContainer } from "./styled";

export const HexGrid = ({ rows, clickHandler }) => {
  return (
    <HexContainer>
      {rows.map((row, i) => (
        <HexGridRow key={`GridRow${i}`} row={row} clickHandler={clickHandler} />
      ))}
    </HexContainer>
  );
};

export default HexGrid;

HexGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func
};

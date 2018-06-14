import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import HexGridRow from "./HexGridRow";

export const HexGrid = ({ rows, clickHandler }) => {
  return (
    <Grid centered container columns={10}>
      {rows.map((row, i) => (
        <HexGridRow key={`GridRow${i}`} row={row} clickHandler={clickHandler} />
      ))}
    </Grid>
  );
};

export default HexGrid;

HexGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func
};

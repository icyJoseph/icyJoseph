import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import HexGridRow from "./HexGridRow";

export const HexGrid = ({ rows, clickHandler }) => {
  return (
    <Grid
      columns={10}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "100px"
      }}
    >
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

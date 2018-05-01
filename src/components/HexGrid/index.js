import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import HexGridRow from "./HexGridRow";

const HexGrid = ({ rows }) => {
  const dummyRows = [[1, 2, 3], [4, 5, 6, 7], [8, 9, 10]];
  return (
    <Grid centered>
      {dummyRows.map(row => <HexGridRow key={row} row={row} />)}
    </Grid>
  );
};

export default HexGrid;

HexGrid.propTypes = {
  rows: PropTypes.arrayOf({
    row: PropTypes.array
  })
};

import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import HexGridColumn from "./HexGridColumn";

const HexGridRow = ({ row, clickHandler }) => {
  return (
    <Grid.Row>
      {row.map(tile => (
        <HexGridColumn key={tile.id} clickHandler={clickHandler} tile={tile} />
      ))}
    </Grid.Row>
  );
};
export default HexGridRow;

HexGridRow.propTypes = {
  rows: PropTypes.arrayOf({
    row: PropTypes.array
  }),
  clickHandler: PropTypes.func
};

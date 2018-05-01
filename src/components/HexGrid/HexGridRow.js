import React from "react";
import { Grid } from "semantic-ui-react";

import HexGridColumn from "./HexGridColumn";

const HexGridRow = ({ row }) => {
  return (
    <Grid.Row style={style}>
      {row.map(tile => <HexGridColumn key={tile} />)}
    </Grid.Row>
  );
};
export default HexGridRow;

const style = {
  maxHeight: "120px"
};

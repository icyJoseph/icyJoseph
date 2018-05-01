import React from "react";
import { Grid } from "semantic-ui-react";
import Hexagon from "react-hexagon";

const HexGridColumn = () => (
  <Grid.Column style={style} largeScreen={2} widescreen={1}>
    <Hexagon style={{ stroke: "#42873f" }} href="" diagonal={10} />
  </Grid.Column>
);

export default HexGridColumn;

const style = {
  maxHeight: "120px"
};

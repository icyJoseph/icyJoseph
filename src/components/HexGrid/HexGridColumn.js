import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import Hexagon from "react-hexagon";

const HexGridColumn = ({ tile, clickHandler }) => {
  const { Component, fill, backgroundFill } = tile;
  return (
    <Grid.Column largeScreen={2} widescreen={1}>
      <Hexagon
        style={{ stroke: "none", fill: backgroundFill }}
        diagonal={10}
        onClick={clickHandler}
        children={<Component handler={clickHandler} fill={fill} />}
      />
    </Grid.Column>
  );
};

export default HexGridColumn;

HexGridColumn.propTypes = {
  tile: PropTypes.object,
  clickHandler: PropTypes.func
};

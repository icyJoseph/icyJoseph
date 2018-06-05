import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import Hexagon from "react-hexagon";

const HexGridColumn = ({ tile, clickHandler }) => {
  const { Component, fill, backgroundFill, Content } = tile;
  const injectHandlerWithContent = () => clickHandler(Content);
  return (
    <Grid.Column>
      <Hexagon
        style={{ stroke: "none", fill: backgroundFill }}
        diagonal={100}
        onClick={injectHandlerWithContent}
        children={<Component handler={injectHandlerWithContent} fill={fill} />}
      />
    </Grid.Column>
  );
};

export default HexGridColumn;

HexGridColumn.propTypes = {
  tile: PropTypes.shape({
    Component: PropTypes.func,
    fill: PropTypes.string,
    backgroundFill: PropTypes.string,
    Content: PropTypes.func
  }),
  clickHandler: PropTypes.func
};

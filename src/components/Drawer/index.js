import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

export const Drawer = ({ Content }) => {
  return <Segment basic>{Content && <Content />}</Segment>;
};

export default Drawer;

Drawer.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.func,
  close: PropTypes.func
};

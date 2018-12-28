import React from "react";
import PropTypes from "prop-types";

export const Drawer = ({ Content, ...props }) => {
  return <Segment basic>{Content && <Content {...props} />}</Segment>;
};

export default Drawer;

Drawer.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.func,
  close: PropTypes.func
};

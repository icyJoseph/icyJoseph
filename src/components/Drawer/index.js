import React from "react";
import PropTypes from "prop-types";
import { Button, Sidebar, Segment } from "semantic-ui-react";

export const Drawer = ({ visibility, Content, close, background }) => {
  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      width="wide"
      visible={visibility}
      direction="right"
      style={{
        height: "calc(100vh - 100px) !important",
        background: background || "#FFFFF0"
      }}
    >
      <Button onClick={close}>Close</Button>
      <Segment basic style={{ marginBottom: "30px" }}>
        {Content && <Content />}
      </Segment>
    </Sidebar>
  );
};

export default Drawer;

Drawer.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.func,
  close: PropTypes.func
};

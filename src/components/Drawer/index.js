import React from "react";
import PropTypes from "prop-types";
import { Button, Sidebar, Segment } from "semantic-ui-react";

export const SideContent = ({ visibility, Content, close }) => {
  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      width="wide"
      visible={visibility}
      direction="right"
      style={{ height: "calc(100vh - 100px) !important" }}
    >
      <Segment basic>{Content}</Segment>
      <Button onClick={close}>Close</Button>
    </Sidebar>
  );
};

export default SideContent;

SideContent.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.object,
  close: PropTypes.func
};

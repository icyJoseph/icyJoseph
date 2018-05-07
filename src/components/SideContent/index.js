import React from "react";
import PropTypes from "prop-types";
import { Button, Sidebar, Segment } from "semantic-ui-react";

export const SideContent = ({ visibility, Content, close }) => {
  return (
    <Sidebar
      as={Segment}
      animation="scale down"
      width="wide"
      visible={visibility}
      direction="right"
    >
      <Segment basic>{visibility && Content}</Segment>
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

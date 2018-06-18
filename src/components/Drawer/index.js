import React from "react";
import PropTypes from "prop-types";
import { Button, Segment } from "semantic-ui-react";

import { SideBarWrapper } from "./styled";

export const Drawer = ({ visibility, Content, close, background }) => {
  return (
    <SidebarWrapper
      as={Segment}
      animation="overlay"
      width="wide"
      visible={visibility}
      direction="right"
    >
      <Button onClick={close}>Close</Button>
      <Segment basic style={{ marginBottom: "30px" }}>
        {Content && <Content />}
      </Segment>
    </SidebarWrapper>
  );
};

export default Drawer;

Drawer.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.func,
  close: PropTypes.func
};

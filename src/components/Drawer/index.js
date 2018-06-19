import React from "react";
import PropTypes from "prop-types";
import { Button, Segment } from "semantic-ui-react";

import { SideBarWrapper } from "./styled";

export const Drawer = ({ visibility, Content, close, background }) => {
  return (
    <SideBarWrapper
      as={Segment}
      animation="overlay"
      width="wide"
      visible={visibility}
      direction="right"
      background={background}
    >
      <Button onClick={close}>Close</Button>
      <Segment basic style={{ marginBottom: "30px" }}>
        {Content && <Content />}
      </Segment>
    </SideBarWrapper>
  );
};

export default Drawer;

Drawer.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.func,
  close: PropTypes.func
};

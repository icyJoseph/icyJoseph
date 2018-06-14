import React from "react";
import { Segment, Loader as Spinner } from "semantic-ui-react";
import { Message } from "semantic-ui-react";
import Broken from "../../logos/Broken";

export const BodyLoader = ({ pastDelay, error }) => {
  // Handle the error state
  if (error) {
    return (
      <Segment inverted style={style}>
        <Broken />
        <Message
          error
          style={{
            marginTop: "-100px",
            borderRadius: 0,
            boxShadow: "none"
          }}
          color="black"
        >
          <Message.Content>
            <Message.Header>
              There was a problem loading this page.
            </Message.Header>
            Please reload the page.
          </Message.Content>
        </Message>
      </Segment>
    );
  } else if (pastDelay) {
    // Handle the loading state
    return (
      <Segment inverted style={style}>
        <Spinner active indeterminate size="massive" />
      </Segment>
    );
  } else {
    return null;
  }
};

const style = {
  margin: 0,
  position: "absolute",
  top: 0,
  bottom: 0,
  borderRadius: 0,
  width: "100%",
  flexL: 1,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center"
};

export default BodyLoader;

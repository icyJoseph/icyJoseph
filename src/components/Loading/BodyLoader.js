import React from "react";
import { Segment, Loader as Spinner } from "semantic-ui-react";
import Error from "../../logos/Error";

export const Loader = ({ pastDelay, error }) => {
  // Handle the error state
  if (error) {
    return (
      <Segment inverted style={style}>
        <Error />
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
  top: 0,
  borderRadius: 0,
  height: "calc(100vh - 140px)"
};

export default Loader;

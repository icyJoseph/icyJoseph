import React from "react";
import { Message, Icon } from "semantic-ui-react";

export const BottomLoader = ({ pastDelay, error }) => {
  // Handle the error state
  if (error) {
    return (
      <Message
        error
        style={{
          position: "absolute",
          bottom: 0,
          margin: 0,
          borderRadius: 0,
          boxShadow: "none",
          zIndex: 2
        }}
        color="black"
        icon
      >
        <Icon name="circle notched" color="grey" />
        <Message.Content>
          <Message.Header>
            There was a problem loading this component.
          </Message.Header>
          Please reload the page.
        </Message.Content>
      </Message>
    );
  } else if (pastDelay) {
    // Handle the loading state
    return (
      <Message
        style={{
          position: "absolute",
          margin: 0,
          borderRadius: 0,
          bottom: 0,
          zIndex: 2
        }}
        icon
        color="black"
      >
        <Icon name="circle notched" loading color="grey" />
        <Message.Content>
          <Message.Header>Just one second...</Message.Header>
          Fetching this component for you.
        </Message.Content>
      </Message>
    );
  } else {
    return null;
  }
};

export default BottomLoader;

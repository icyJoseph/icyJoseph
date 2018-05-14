import React from "react";
import { Message, Icon } from "semantic-ui-react";

export const HeaderLoader = ({ pastDelay, error }) => {
  // Handle the error state
  if (error) {
    return (
      <Message error style={{ margin: 0 }} color="black" icon>
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
      <Message style={{ margin: 0, borderRadius: 0 }} icon color="black">
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

export default HeaderLoader;

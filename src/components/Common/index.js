import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { capitalize } from "../../functional";

const description = ["Coming soon..."].join(" ");

export const Common = ({ title }) => {
  return (
    <Card>
      <Card.Content header={capitalize(title)} />
      <Card.Content description={description} />
      <Card.Content extra>
        <Icon name="user" />
      </Card.Content>
    </Card>
  );
};

export default Common;

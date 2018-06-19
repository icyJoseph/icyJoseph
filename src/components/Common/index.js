import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { capitalize } from "../../functional";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York."
].join(" ");

export const Common = ({ title }) => {
  return (
    <Card>
      <Card.Content header={capitalize(title)} />
      <Card.Content description={description} />
      <Card.Content extra>
        <Icon name="user" />
        4 Friends
      </Card.Content>
    </Card>
  );
};

export default Common;

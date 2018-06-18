import React from "react";
import { Button, Icon, Item, Label } from "semantic-ui-react";

export const Entry = ({ name, description, topics, html_url, language }) => {
  return (
    <Item.Group divided>
      <Item>
        <Item.Content>
          <Item.Header as="a">{name}</Item.Header>
          <Item.Description>
            <p>{description}</p>
          </Item.Description>
          <Item.Extra>
            {topics.map(topic => <Label key={topic}>{topic}</Label>)}
            <Button
              primary
              floated="right"
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              To Repo
              <Icon name="right chevron" />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default Entry;

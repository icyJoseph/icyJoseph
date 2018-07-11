import React from "react";
import { Button, Icon, Card, Label } from "semantic-ui-react";
import Bio from "./Bio";

const medium = "https://medium.com/@icjoseph";

export const Feed = ({ title, uniqueSlug, virtuals, content }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Description>{content.subtitle}</Card.Description>
      <Card.Meta>
        <Label.Group>
          <Label>
            <Icon name="book" /> {virtuals.wordCount} words
          </Label>
        </Label.Group>
        <Label.Group>
          {virtuals.tags.map(tag => (
            <Label key={tag.slug} color={"blue"}>
              {tag.name}
            </Label>
          ))}
        </Label.Group>
      </Card.Meta>
      <Button
        basic
        color="blue"
        floated="right"
        href={`${medium}/${uniqueSlug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        To article
        <Icon name="right chevron" />
      </Button>
    </Card.Content>
  </Card>
);

export { Bio };

export default Feed;

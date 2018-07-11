import React from "react";
import {
  Button,
  Icon,
  Card,
  Feed as Content,
  Label,
  Image
} from "semantic-ui-react";
import Media from "react-media";
import Bio from "./Bio";

export const imageSrc = "https://miro.medium.com/fit/c/240/240";
export const medium = "https://medium.com/@icjoseph";

export const Feed = ({ title, uniqueSlug, virtuals, content }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Content>
        <Media
          query="(min-width: 689px)"
          render={() => (
            <Image
              circular
              floated="left"
              style={{ width: "150px" }}
              src={`${imageSrc}/${virtuals.previewImage.imageId}`}
            />
          )}
        />
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
      </Content>
    </Card.Content>
  </Card>
);

export { Bio };

export default Feed;

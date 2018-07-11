import React from "react";
import { Button, Icon, Item, Segment } from "semantic-ui-react";

const mediumFeed = "https://medium.com/@icjoseph/?feed=latest";
const imageSrc = "https://miro.medium.com/fit/c/192/192";

export const Bio = ({ ...props }) => (
  <Item.Group as={Segment}>
    <Item>
      <Item.Image src={`${imageSrc}/${props.imageId}`} />
      <Item.Content>
        <Item.Header as="h3">{props.name}</Item.Header>
        <Item.Meta>{props.username} </Item.Meta>
        <Item.Description>{props.bio}</Item.Description>
        <Item.Extra>
          <Button
            primary
            floated="left"
            href={mediumFeed}
            target="_blank"
            rel="noopener noreferrer"
          >
            To Medium
            <Icon name="right chevron" />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
);

export default Bio;

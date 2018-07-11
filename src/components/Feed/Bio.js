import React from "react";
import { Header, Icon, Image, Button } from "semantic-ui-react";

const mediumFeed = "https://medium.com/@icjoseph/?feed=latest";
const imageSrc = "https://miro.medium.com/fit/c/192/192";

export const Bio = ({ imageId, name, username, bio }) => (
  <Header as="h1" size="huge" dividing color="blue">
    <Image circular src={`${imageSrc}/${imageId}`} />
    <Header.Content>
      {name}
      <Header.Subheader>{username}</Header.Subheader>
      <Header.Subheader>{bio}</Header.Subheader>
    </Header.Content>
    <Button
      basic
      color="blue"
      floated="right"
      href={mediumFeed}
      target="_blank"
      rel="noopener noreferrer"
    >
      To Medium
      <Icon name="right chevron" />
    </Button>
  </Header>
);

export default Bio;

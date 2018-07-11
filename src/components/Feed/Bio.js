import React from "react";
import Media from "react-media";
import { Header, Icon, Image, Button } from "semantic-ui-react";

const mediumFeed = "https://medium.com/@icjoseph/?feed=latest";
const imageSrc = "https://miro.medium.com/fit/c/240/240";

export const Bio = ({ imageId, name, username, bio }) => (
  <Header as="h1" block size="huge" dividing color="blue">
    <Media
      query="(min-width: 579px)"
      render={() => (
        <Image
          circular
          style={{ width: "150px" }}
          src={`${imageSrc}/${imageId}`}
        />
      )}
    />
    <Header.Content>
      {name}
      <Header.Subheader>{username}</Header.Subheader>
      <Header.Subheader>{bio}</Header.Subheader>
    </Header.Content>
    <Media
      query="(min-width: 515px)"
      render={() => (
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
      )}
    />
  </Header>
);

export default Bio;

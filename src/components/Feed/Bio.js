import React from "react";
import Media from "react-media";
import { Header, Icon, Image, Button } from "semantic-ui-react";
import { imageSrc, medium } from "./";

const mediumFeed = `${medium}/?feed=latest`;

export const Bio = ({ imageId, name, username, bio }) => (
  <Header as="h1" block size="huge" dividing color="blue">
    {imageId && (
      <Media
        query="(min-width: 689px)"
        render={() => (
          <Image
            circular
            style={{ width: "150px" }}
            src={`${imageSrc}/${imageId}`}
          />
        )}
      />
    )}
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

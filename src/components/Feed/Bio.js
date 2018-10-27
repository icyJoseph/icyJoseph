import React, { Component } from "react";
import { Header, Icon, Image, Button } from "semantic-ui-react";
import { imageSrc, medium } from "./";
import { setUpMediaQuery } from "../../helpers";

const mediumFeed = `${medium}/?feed=latest`;

export class Bio extends Component {
  state = { showImg: false };

  componentDidMount() {
    setUpMediaQuery.bind(this)("(min-width: 689px)");
  }

  updateMatches = () => {
    const { matches } = this.mediaQueryList;
    return this.setState({ showImg: matches });
  };

  componentWillUnmount() {
    return this.mediaQueryList.removeListener(this.updateMatches);
  }

  render() {
    const { imageId, name, username, bio } = this.props;
    const { showImg } = this.state;
    return (
      <Header as="h1" block size="huge" dividing color="blue">
        {imageId &&
          showImg && (
            <Image
              circular
              style={{ width: "150px" }}
              src={`${imageSrc}/${imageId}`}
            />
          )}
        <Header.Content>
          {name}
          <Header.Subheader>{username}</Header.Subheader>
          <Header.Subheader>{bio}</Header.Subheader>
        </Header.Content>
        {showImg && (
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
      </Header>
    );
  }
}

export default Bio;

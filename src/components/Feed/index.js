import React, { Component } from "react";
import Bio from "./Bio";
import { setUpMediaQuery } from "../../helpers";

export const imageSrc = "https://miro.medium.com/fit/c/240/240";
export const medium = "https://medium.com/@icjoseph";

export class Feed extends Component {
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
    const { title, uniqueSlug, virtuals, content } = this.props;
    const { showImg } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Content>
            {virtuals &&
              showImg && (
                <Image
                  circular
                  floated="left"
                  style={{ width: "150px" }}
                  src={`${imageSrc}/${virtuals.previewImage.imageId}`}
                />
              )}
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
  }
}

export { Bio };

export default Feed;

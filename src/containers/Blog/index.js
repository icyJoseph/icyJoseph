import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withGitHub } from "../GitHubHoC";
import { Card, CardWrapper, Author } from "../../components/Card";
import { Title } from "../../components/Title";
import { fetchFeed } from "../../ducks/medium";
import { shouldFetch } from "../../helpers";

import { imageSrc } from "../../constants";

export class Blog extends Component {
  state = { shadow: false, loadedImages: [], errorImages: [] };

  componentDidMount() {
    document.title = "Blog - icyJoseph";

    const {
      medium: { expiry }
    } = this.props;
    return shouldFetch(expiry) && this.props.fetchFeed();
  }

  handleImageLoaded = id => () =>
    this.setState(prev => ({
      loadedImages: prev.loadedImages.concat(id)
    }));

  handleImageError = id => () =>
    this.setState(prev => ({
      errorImages: prev.errorImages.concat(id)
    }));

  render() {
    const { shadow, loadedImages } = this.state;
    const { medium } = this.props;
    const {
      feed: { articles, user }
    } = medium;

    return (
      <div>
        <Title>
          <h1>Blog</h1>
        </Title>
        {!!user.username && (
          <div>
            <Author>
              <img src={`${imageSrc()}/${user.imageId}`} alt="user" />
              <div>
                <span>{user.name}</span>
                <span>
                  <code>@{user.username}</code>
                </span>
                <span>{user.bio}</span>
              </div>
            </Author>
            <CardWrapper>
              {Object.keys(articles).map(id => {
                const article = articles[id];
                const {
                  title,
                  virtuals: {
                    subtitle,
                    previewImage: { imageId },
                    wordCount
                  }
                } = article;
                return (
                  <Card key={id} words={wordCount}>
                    <img
                      src={`${imageSrc(512)}/${imageId}`}
                      alt="user"
                      onLoad={this.handleImageLoaded(id)}
                      onError={this.handleImageError(id)}
                    />
                    {loadedImages.includes(id) && (
                      <div>
                        <div>
                          <span content={title}>{title}</span>
                          <span content={subtitle}>{subtitle}</span>
                          <span>
                            <span content={`${wordCount} words`}>
                              {wordCount}
                            </span>{" "}
                            words
                          </span>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </CardWrapper>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ medium }) => ({ medium });
const mapDispatchToProps = {
  fetchFeed
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withGitHub
)(Blog);

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withGitHub } from "../GitHubHoC";
import { Card, CardWrapper, Author } from "../../components/Card";
import { Title } from "../../components/Title";
import { fetchFeed } from "../../ducks/medium";
import { shouldFetch } from "../../helpers";
import { observeHeader } from "../../utils/stickyEvent";
// import { get } from "../../functional";

import { imageSrc } from "../../constants";

export class Blog extends Component {
  state = { shadow: false };
  componentDidMount() {
    document.title = "Blog - icyJoseph";

    observeHeader(document.getElementById("blog"));

    document.addEventListener("sticky-change", this.appendShadow);

    const {
      medium: { expiry }
    } = this.props;
    return shouldFetch(expiry) && this.props.fetchFeed();
  }

  appendShadow = e => {
    const stuck = e.detail.stuck;
    return this.setState({ shadow: stuck });
  };

  componentWillUnmount() {
    document.removeEventListener("sticky-change", this.appendShadow);
  }

  render() {
    const { shadow } = this.state;
    const { medium } = this.props;
    const {
      feed: { articles, user }
    } = medium;

    return (
      <div id="blog">
        <Title sticky id="sticky-blog" shadow={shadow}>
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
                  <Card key={id}>
                    <img src={`${imageSrc(512)}/${imageId}`} alt="user" />
                    <div>
                      <span>{title}</span>
                      <span>{subtitle}</span>
                      <span>words: {wordCount}</span>
                    </div>
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

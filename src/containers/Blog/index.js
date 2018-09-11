import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Card, Loader } from "semantic-ui-react";

import Feed, { Bio } from "../../components/Feed";
import { fetchFeed } from "../../ducks/medium";
import { shouldFetch } from "../../helpers/";
import { get } from "../../functional";

export class Blog extends Component {
  componentDidMount() {
    const {
      medium: { expiry }
    } = this.props;
    return shouldFetch(expiry) && this.props.fetchFeed();
  }
  render() {
    const {
      feed: { user, articles }
    } = this.props.medium;
    const posts = articles
      ? Object.keys(articles).map(id => get(articles, id, []))
      : [];
    return posts.length > 0 ? (
      <Container
        style={{
          padding: "10px 3px 100px 3px",
          marginBottom: 50,
          marginTop: 50
        }}
      >
        <Bio {...user} />
        <Card.Group>
          {posts.map(post => (
            <Feed key={post.id} {...post} />
          ))}
        </Card.Group>
      </Container>
    ) : (
      <Loader active inline="centered" />
    );
  }
}

const mapStateToProps = ({ medium }) => ({ medium });
const mapDispatchToProps = {
  fetchFeed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

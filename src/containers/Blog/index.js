import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid, Card } from "semantic-ui-react";

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
    const posts = Object.keys(articles).map(id => get(articles, id, []));
    return (
      <Container
        style={{
          padding: 10,
          marginBottom: 100,
          marginTop: 50
        }}
      >
        <Bio {...user} />
        <Grid style={{ marginTop: 20 }}>
          <Card.Group>
            {posts.map(post => <Feed key={post.id} {...post} />)}
          </Card.Group>
        </Grid>
      </Container>
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

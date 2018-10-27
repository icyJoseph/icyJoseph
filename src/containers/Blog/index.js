import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Container, Card } from "semantic-ui-react";
import { Background, Mask } from "../../components/Background";
import Feed, { Bio } from "../../components/Feed";
import { fetchFeed } from "../../ducks/medium";
import { shouldFetch, setUpMediaQuery } from "../../helpers/";
import { get } from "../../functional";
import { desktopBreakPoint } from "../../constants";
import Spinner from "../../logos/Spinner";
import blogBackground from "../../assets/images/blogBackground.jpg";

export class Blog extends Component {
  state = { desktop: false };
  componentDidMount() {
    setUpMediaQuery.bind(this)(desktopBreakPoint);

    const {
      medium: { expiry }
    } = this.props;
    return shouldFetch(expiry) && this.props.fetchFeed();
  }

  updateMatches = () => {
    const { matches } = this.mediaQueryList;
    return this.setState({ desktop: matches });
  };

  componentWillUnmount() {
    return this.mediaQueryList.removeListener(this.updateMatches);
  }

  render() {
    const {
      feed: { user, articles }
    } = this.props.medium;
    const posts = articles
      ? Object.keys(articles).map(id => get(articles, id, []))
      : [];

    const { desktop } = this.state;
    return (
      <Fragment>
        <Background desktop={desktop} background={blogBackground} />
        <Mask desktop={desktop} tint={0.5} />
        {posts.length > 0 ? (
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
          <Spinner />
        )}
      </Fragment>
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

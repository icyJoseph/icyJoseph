import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Entry from "./Entry";
import { fetchUserRepos } from "../../ducks/github";
import { shouldFetch } from "../../helpers";
import { capitalize } from "../../functional";
import { filterCriteria } from "./helpers";
import { icyJoseph, darkBlue } from "../../constants";

export class Portfolio extends Component {
  componentDidMount() {
    const {
      github: { expiry, topics }
    } = this.props;
    const noTopicsOrExpired = topics.length === 0 || shouldFetch(expiry);
    return noTopicsOrExpired && this.props.fetchUserRepos(icyJoseph);
  }

  renderRelevantEntries() {
    const {
      meta,
      github: { topics, repos }
    } = this.props;

    const topicsObject = topics.reduce((acc, val) => ({ ...acc, ...val }), {});
    const relevantRepos = repos
      .filter(repo => {
        const { name } = repo;
        const repoTopics = topicsObject[name];
        if (!repoTopics) {
          return false;
        }
        return repoTopics.length > 0 && filterCriteria(repoTopics, meta);
      })
      .map(({ name, ...rest }) => ({
        ...rest,
        name,
        topics: topicsObject[name]
      }));
    return (
      <Fragment>
        <Label style={{ color: darkBlue }}>
          <Icon name="github" />
          {relevantRepos.length}
        </Label>
        <Item.Group divided>
          {relevantRepos.map(({ name, ...rest }) => (
            <Entry key={name} name={name} {...rest} />
          ))}
        </Item.Group>
      </Fragment>
    );
  }

  render() {
    const {
      github: { topics },
      meta,
      type = "projects"
    } = this.props;

    return (
      <Container>
        <h3 style={portFolioTitleStyle}>
          {capitalize(meta)} {type}
        </h3>
        {topics.length === 0 ? (
          <Loader active inline="centered" />
        ) : (
          this.renderRelevantEntries()
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ github }) => ({ github });
const mapDispatchToProps = { fetchUserRepos };
const portFolioTitleStyle = {
  color: "white"
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Entry from "./Entry";
import { fetchUserRepos } from "../../ducks/github";
import { shouldFetch } from "../../helpers";
import { capitalize } from "../../functional";
import { filterCriteria } from "./helpers";

export class Portfolio extends Component {
  componentDidMount() {
    const {
      github: { expiry }
    } = this.props;
    return shouldFetch(expiry) && this.props.fetchUserRepos("icyJoseph");
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
        return repoTopics.length > 0 && filterCriteria(repoTopics, meta);
      })
      .map(({ name, ...rest }) => ({
        ...rest,
        name,
        topics: topicsObject[name]
      }));
    return relevantRepos.map(({ name, ...rest }) => (
      <Entry key={name} name={name} {...rest} />
    ));
  }

  render() {
    const {
      github: { topics },
      meta
    } = this.props;
    return (
      <Fragment>
        <h3>{capitalize(meta)}</h3>
        {topics.length > 0 && this.renderRelevantEntries()}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ github }) => ({ github });
const mapDispatchToProps = { fetchUserRepos };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

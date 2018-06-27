import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Loadable from "react-loadable";
import { connect } from "react-redux";
import { TabletWrapper, Background } from "./styled";
import { fetchUserData, fetchUserRepos } from "../../ducks/github";
import Spinner from "../../components/Loading/Spinner";
import { mapValueToFunctions } from "../../functional";
import { shouldFetch } from "../../helpers";

import nightBackground from "./night-coding.jpg";

const AsyncTitle = Loadable({
  loader: () => import("../../components/MainTitle"),
  loading: Spinner,
  delay: 400
});

const AsyncStatistics = Loadable({
  loader: () => import("../../components/Statistics"),
  loading: Spinner,
  delay: 700
});

const AsyncTimeLine = Loadable({
  loader: () => import("../../components/TimeLine"),
  loading: Spinner,
  delay: 700
});

export class Tablet extends Component {
  componentDidMount() {
    const {
      github: { expiry, commits, languages }
    } = this.props;

    const noDataOrExpired =
      languages.length === 0 || commits === 0 || shouldFetch(expiry);
    return (
      noDataOrExpired &&
      mapValueToFunctions(this.props.fetchUserRepos, this.props.fetchUserData)(
        "icyJoseph"
      )
    );
  }

  render() {
    const { data, github, desktop } = this.props;
    const {
      user: { public_repos, public_gists },
      commits,
      languages
    } = github;

    const noTransition = {
      timeout: 0,
      delayMin: 0,
      delayMax: 0
    };
    return (
      <Fragment>
        {desktop && <Background background={nightBackground} />}
        <TabletWrapper desktop={desktop}>
          <AsyncTitle title="Joseph" {...noTransition} />
          <AsyncTitle title="Front-end developer" />
          <AsyncStatistics
            publicRepos={public_repos}
            commits={commits}
            publicGists={public_gists}
            languages={languages}
            desktop={desktop}
          />
          {!desktop && <AsyncTimeLine data={data} />}
        </TabletWrapper>
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ github }) => ({ github });
export const mapDispatchToProps = { fetchUserData, fetchUserRepos };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tablet);

Tablet.propTypes = {
  data: PropTypes.array,
  github: PropTypes.object,
  fetchUserData: PropTypes.func,
  fetchUserRepos: PropTypes.func
};

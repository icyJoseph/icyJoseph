import React, { Component } from "react";
import PropTypes from "prop-types";

import Loadable from "react-loadable";
import { connect } from "react-redux";
import { TabletWrapper } from "./styled";
import { fetchUserData, fetchUserRepos } from "../../ducks/github";
import Spinner from "../../components/Loading/Spinner";
import { mapValueToFunctions } from "../../functional";

const AsyncTitle = Loadable({
  loader: () => import("../../components/MainTitle"),
  loading: Spinner,
  delay: 400
});

const AsyncStatistics = Loadable({
  loader: () => import("../../components/Statistics"),
  loading: Spinner,
  delay: 400
});

const AsyncTimeLine = Loadable({
  loader: () => import("../../components/TimeLine"),
  loading: Spinner,
  delay: 400
});

export class Tablet extends Component {
  componentDidMount() {
    const {
      github: { expiry }
    } = this.props;
    const now = new Date();
    const lastSave = new Date(expiry);

    return (
      now > lastSave &&
      mapValueToFunctions(this.props.fetchUserRepos, this.props.fetchUserData)(
        "icyJoseph"
      )
    );
  }

  render() {
    const { data, github } = this.props;
    const {
      user: { public_repos },
      commits,
      languages
    } = github;

    return (
      <TabletWrapper>
        <AsyncTitle title="Meet Joseph" />
        <AsyncStatistics
          publicRepos={public_repos}
          commits={commits}
          languages={languages}
        />
        <AsyncTimeLine data={data} />
      </TabletWrapper>
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
  data: PropTypes.array
};

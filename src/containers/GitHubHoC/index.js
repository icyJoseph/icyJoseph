import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openDrawer, closeDrawer, changeContent } from "../../ducks/drawer";
import { fetchUserData, fetchUserRepos } from "../../ducks/github";
import { mapValueToFunctions } from "../../functional";
import { shouldFetch } from "../../helpers";
import { icyJoseph } from "../../constants";

import data from "../../data";

export function withGitHub(Render) {
  class GitHubHoC extends Component {
    static propTypes = {
      github: PropTypes.object,
      data: PropTypes.array,
      visibility: PropTypes.bool,
      contentId: PropTypes.number,
      openDrawer: PropTypes.func,
      closeDrawer: PropTypes.func,
      changeContent: PropTypes.func,
      fetchUserData: PropTypes.func,
      fetchUserRepo: PropTypes.func
    };

    componentDidMount() {
      const {
        github: { expiry, commits, languages }
      } = this.props;

      const noDataOrExpired =
        languages.length === 0 || commits === 0 || shouldFetch(expiry);

      // setUpMediaQuery.bind(this)(desktopBreakPoint);
      return (
        noDataOrExpired &&
        mapValueToFunctions(
          this.props.fetchUserRepos,
          this.props.fetchUserData
        )(icyJoseph)
      );
    }

    render() {
      return <Render {...this.props} />;
    }
  }

  const mapStateToProps = ({ github, drawer: { open, id } }) => ({
    github,
    visibility: open,
    contentId: id,
    data
  });

  const mapDispatchToProps = {
    openDrawer,
    closeDrawer,
    changeContent,
    fetchUserData,
    fetchUserRepos
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(GitHubHoC);
}

export default withGitHub;

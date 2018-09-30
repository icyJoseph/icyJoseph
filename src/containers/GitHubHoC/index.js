import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openDrawer, closeDrawer, changeContent } from "../../ducks/drawer";
import { fetchToken } from "../../ducks/auth";

import { fetchUserData, fetchUserRepos } from "../../ducks/github";
import { mapValueToFunctions } from "../../functional";
import { shouldFetch, setUpMediaQuery } from "../../helpers";
import { desktopBreakPoint, icyJoseph } from "../../constants";
import data from "../../data";
import timeLine from "../../data/TimeLine";

export function withGitHub(toRender) {
  class GitHubHoC extends Component {
    static propTypes = {
      github: PropTypes.object,
      data: PropTypes.array,
      visibility: PropTypes.bool,
      contentId: PropTypes.number,
      timeLine: PropTypes.array,
      fetchToken: PropTypes.func,
      openDrawer: PropTypes.func,
      closeDrawer: PropTypes.func,
      changeContent: PropTypes.func,
      fetchUserData: PropTypes.func,
      fetchUserRepo: PropTypes.func
    };

    state = { desktop: false };
    componentDidMount() {
      const {
        github: { expiry, commits, languages }
      } = this.props;

      const noDataOrExpired =
        languages.length === 0 || commits === 0 || shouldFetch(expiry);

      setUpMediaQuery.bind(this)(desktopBreakPoint);
      return (
        noDataOrExpired &&
        mapValueToFunctions(
          this.props.fetchUserRepos,
          this.props.fetchUserData
        )(icyJoseph)
      );
    }

    updateMatches = () => {
      const { matches } = this.mediaQueryList;
      return this.setState({ desktop: matches });
    };

    render() {
      return toRender({ ...this.props, ...this.state });
    }
  }

  const mapStateToProps = ({ github, drawer: { open, id } }) => ({
    github,
    visibility: open,
    contentId: id,
    data,
    timeLine
  });

  const mapDispatchToProps = {
    fetchToken,
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

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserData, fetchUserRepos } from "../../ducks/github";
import { mapValueToFunctions } from "../../functional";
import { shouldFetch } from "../../helpers";
import { icyJoseph } from "../../constants";

export function withGitHub(Render) {
  GitHubHoC.propTypes = {
    github: PropTypes.object,
    fetchUserData: PropTypes.func,
    fetchUserRepo: PropTypes.func
  };

  function GitHubHoC({ github, dispatch: omit, ...props }) {
    const { expiry, commits, languages = [] } = github;

    useEffect(() => {
      const noDataOrExpired =
        languages.length === 0 || commits === 0 || shouldFetch(expiry);

      noDataOrExpired &&
        mapValueToFunctions(props.fetchUserRepos, props.fetchUserData)(
          icyJoseph
        );
    }, []);

    return <Render github={github} {...props} />;
  }

  const mapStateToProps = ({ github }) => ({
    github
  });

  const mapDispatchToProps = {
    fetchUserData,
    fetchUserRepos
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(GitHubHoC);
}

export default withGitHub;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserData, fetchUserRepos } from "../../ducks/github";
import { shouldFetch } from "../../helpers";
import { icyJoseph } from "../../constants";

export function withGitHub(Render) {
  GitHubHoC.propTypes = {
    github: PropTypes.object,
    fetchUserData: PropTypes.func,
    fetchUserRepo: PropTypes.func
  };

  function GitHubHoC({
    fetchUserRepos,
    fetchUserData,
    github,
    dispatch: omit,
    ...props
  }) {
    const { expiry } = github;

    useEffect(() => {
      shouldFetch(expiry) &&
        fetchUserRepos(icyJoseph) &&
        fetchUserData(icyJoseph);
    }, [expiry, fetchUserRepos, fetchUserData]);

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

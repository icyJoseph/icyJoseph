import React from "react";
import PropTypes from "prop-types";
import Stat from "../../components/Stat";
import { Statistics } from "../../components/Stat/styled";
import Title from "../../components/Title";
import withGitHub from "../GitHubHoC";

export const Landing = ({
  timeLine,
  github: {
    user: { public_gists, public_repos },
    commits,
    languages
  },
  desktop
}) => {
  return (
    <div>
      <Title>
        <h1>Joseph</h1>
      </Title>
      <Statistics>
        {languages.map(({ lang, bytes }) => (
          <Stat key={lang} label={lang} end={bytes} />
        ))}
        <Stat label="Commits" end={commits} />
        <Stat label="Public Repos" end={public_repos} />
        <Stat label="Gists" end={public_gists} />
      </Statistics>
    </div>
  );
};

// in the GUI seen as Home
export default withGitHub(Landing);

Landing.propTypes = {
  timeLine: PropTypes.array,
  github: PropTypes.object,
  desktop: PropTypes.bool
};

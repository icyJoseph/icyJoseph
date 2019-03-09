import React, { useState } from "react";
import PropTypes from "prop-types";
import Stat from "../../components/Stat";
import Title from "../../components/Title";
import { Statistics } from "../../components/Stat/styled";
import withGitHub from "../withGitHub";

export function Landing({
  github: {
    user: { public_gists = 0, public_repos = 0 },
    commits = 0,
    languages
  }
}) {
  const [show, setShow] = useState(false);
  const onEnd = () => setShow(true);
  return (
    <div>
      <Title>
        <h1>Joseph</h1>
      </Title>
      <Statistics>
        <Stat label="Repos" end={public_repos} />
        <Stat label="Commits" end={commits} onEnd={onEnd} />
        <Stat label="Gists" end={public_gists} />
      </Statistics>
      {show && (
        <Statistics>
          {languages.map(({ lang, bytes }) => (
            <Stat key={lang} label={lang} end={bytes} />
          ))}
        </Statistics>
      )}
    </div>
  );
}

// in the GUI seen as Home
export default withGitHub(Landing);

Landing.propTypes = {
  github: PropTypes.object
};

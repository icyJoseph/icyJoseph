import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import withGitHub from "../GitHubHoC";
import { Background, Container, Mask } from "../../components/Background";
import Spinner from "../../components/Loading/Spinner";
import nightBackground from "./night-coding.jpg";

const AsyncTitle = Loadable({
  loader: () => import("../../components/MainTitle"),
  loading: Spinner,
  delay: 400
});

const AsyncAssignment = Loadable({
  loader: () => import("../../components/Assignment"),
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

export const Landing = ({
  timeLine,
  github: {
    user: { public_gists, public_repos },
    commits,
    languages
  },
  desktop
}) => (
  <Fragment>
    <Background desktop={desktop} background={nightBackground} />
    <Mask tint={0.5} />
    <Container>
      <AsyncTitle title="Joseph" subtitle="Front End Developer" center />
      <AsyncAssignment title="By Day" subtitle="I work at Volvo Group" />
      <AsyncTitle title="By Night" subtitle="I commit to GitHub" center />
      <AsyncStatistics
        publicRepos={public_repos}
        commits={commits}
        publicGists={public_gists}
        languages={languages}
        desktop={desktop}
      />
      {!desktop && <AsyncTimeLine timeLine={timeLine} />}
    </Container>
  </Fragment>
);

// in the GUI seen as Home
export default withGitHub(Landing);

Landing.propTypes = {
  timeLine: PropTypes.array,
  github: PropTypes.object,
  desktop: PropTypes.bool
};

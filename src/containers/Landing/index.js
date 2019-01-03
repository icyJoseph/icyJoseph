import React from "react";
import PropTypes from "prop-types";
// import Loadable from "react-loadable";
import withGitHub from "../GitHubHoC";
// import nightBackground from "../../assets/images/night-coding.jpg";

// const AsyncTitle = Loadable({
//   loader: () =>
//     import(/*webpackChunkName: "AsyncTitle"*/ "../../components/MainTitle"),
//   loading: Spinner,
//   delay: 400
// });

// const AsyncAssignment = Loadable({
//   loader: () =>
//     import(/*webpackChunkName: "AsyncAssignment"*/ "../../components/Assignment"),
//   loading: Spinner,
//   delay: 400
// });

// const AsyncStatistics = Loadable({
//   loader: () =>
//     import(/*webpackChunkName: "AsyncStatistics"*/ "../../components/Statistics"),
//   loading: Spinner,
//   delay: 700
// });

// const AsyncFeatured = Loadable({
//   loader: () =>
//     import(/*webpackChunkName: "AsyncFeatured"*/ "../../components/Featured"),
//   loading: Spinner,
//   delay: 700
// });

// const AsyncTimeLine = Loadable({
//   loader: () =>
//     import(/*webpackChunkName: "AsyncTimeLine"*/ "../../components/TimeLine"),
//   loading: Spinner,
//   delay: 700
// });

export const Landing = ({
  timeLine,
  github: {
    user: { public_gists, public_repos },
    commits,
    languages
  },
  desktop
}) => {
  return <div>Landing</div>;
};

// in the GUI seen as Home
export default withGitHub(Landing);

Landing.propTypes = {
  timeLine: PropTypes.array,
  github: PropTypes.object,
  desktop: PropTypes.bool
};

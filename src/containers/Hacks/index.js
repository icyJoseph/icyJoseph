import React from "react";
import PropTypes from "prop-types";
import withGitHub from "../GitHubHoC";

export const Hacks = ({ data, desktop, github }) => {
  return <div>Hacks go here</div>;
};

export default withGitHub(Hacks);

Hacks.propTypes = {
  contentId: PropTypes.number,
  openDrawer: PropTypes.func,
  data: PropTypes.array
};

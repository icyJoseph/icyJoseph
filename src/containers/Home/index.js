import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Media from "react-media";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import data from "../../data";
import TimeLine from "../../data/TimeLine";
import Spinner from "../../components/Loading/Spinner";
import { openDrawer, closeDrawer, changeContent } from "../../ducks/drawer";

import { curry } from "../../functional";

export const AsyncTablet = Loadable({
  loader: () => import("../Tablet"),
  loading: Spinner,
  delay: 600
});

export const AsyncDesktop = Loadable({
  loader: () => import("../HomeDesktopGrid"),
  loading: Spinner,
  delay: 600
});

export const MediaRoutes = (props, matches) => {
  return matches ? (
    <AsyncTablet {...props} data={TimeLine} />
  ) : (
    <AsyncDesktop {...props} data={data} />
  );
};
export const Home = props => {
  return (
    <Fragment>
      <Media query={{ maxWidth: 1023 }}>{curry(MediaRoutes)(props)}</Media>
    </Fragment>
  );
};

export const mapStateToProps = state => {
  return {
    visibility: state.drawer.open,
    Content: state.drawer.Content
  };
};

export const mapDispatchToProps = {
  openDrawer,
  closeDrawer,
  changeContent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

Home.propTypes = {
  openDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  changeContent: PropTypes.func,
  visibility: PropTypes.bool,
  Content: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

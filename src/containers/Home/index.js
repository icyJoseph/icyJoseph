import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Media from "react-media";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import data from "../../data";
import TimeLine from "../../data/TimeLine";
import Spinner from "../../components/Loading/Spinner";
import { openDrawer, closeDrawer, changeContent } from "../../ducks/drawer";
import { fetchToken } from "../../ducks/auth";
import { curry } from "../../functional";

export const AsyncTablet = Loadable({
  loader: () => import("../Tablet"),
  loading: Spinner,
  delay: 600
});

export const AsyncDesktop = Loadable({
  loader: () => import("../Desktop"),
  loading: Spinner,
  delay: 600
});

export const MediaRoutes = (props, matches) => {
  const toShow = data.filter(e => !e.hide);
  return matches ? (
    <AsyncTablet {...props} data={TimeLine} />
  ) : (
    <AsyncDesktop {...props} data={toShow} />
  );
};

export class Home extends Component {
  componentDidMount() {
    return this.props.fetchToken();
  }

  render() {
    return (
      <Fragment>
        <Media query={{ maxWidth: 1023 }}>
          {curry(MediaRoutes)(this.props)}
        </Media>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => {
  return {
    token: state.auth.token,
    visibility: state.drawer.open,
    contentId: state.drawer.id
  };
};

export const mapDispatchToProps = {
  fetchToken,
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

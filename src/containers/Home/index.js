import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Media from "react-media";

import { connect } from "react-redux";

import Mobile from "../../components/Mobile";
import HomeDesktopGrid from "../../components/HomeDesktopGrid";

import data from "../../data";

import {
  openSideContent,
  closeSideContent,
  changeContent
} from "../../ducks/actions/sideContainer";

export const Home = props => {
  // Consider adding another breakpoint at 1024px
  return (
    <Fragment>
      <Media query={{ maxWidth: 920 }} render={() => <Mobile />} />
      <Media
        query={{ minWidth: 921 }}
        render={() => <HomeDesktopGrid {...props} data={data} />}
      />
    </Fragment>
  );
};

export const mapStateToProps = state => {
  return {
    visibility: state.sideContainer.open,
    Content: state.sideContainer.Content
  };
};

export const mapDispatchToProps = {
  openSideContent,
  closeSideContent,
  changeContent
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  openSideContent: PropTypes.func,
  closeSideContent: PropTypes.func,
  changeContent: PropTypes.func,
  visibility: PropTypes.bool,
  Content: PropTypes.func
};

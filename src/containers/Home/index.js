import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Media from "react-media";

import { connect } from "react-redux";

// import Mobile from "../Mobile";
import HomeDesktopGrid from "../HomeDesktopGrid";
import Tablet from "../Tablet";

import data from "../../data";

import { openDrawer, closeDrawer, changeContent } from "../../ducks/drawer";

export const Home = props => {
  return (
    <Fragment>
      {/* <Media query={{ maxWidth: 767 }} render={() => <Mobile />} /> */}
      <Media
        // query={{ minWidth: 768, maxWidth: 1023 }}
        query={{ maxWidth: 1023 }}
        render={() => <Tablet {...props} data={data} />}
      />
      <Media
        query={{ minWidth: 1023 }}
        render={() => <HomeDesktopGrid {...props} data={data} />}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  openDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  changeContent: PropTypes.func,
  visibility: PropTypes.bool,
  Content: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Media from "react-media";
import MainTitle from "../../components/MainTitle";
import HexGrid from "../../components/HexGrid";
import Mobile from "../../components/Mobile";

export class Home extends Component {
  renderGrid = this.renderGrid.bind(this);
  renderMobile = this.renderMobile.bind(this);

  renderGrid() {
    return <HexGrid />;
  }

  renderMobile() {
    return <Mobile />;
  }

  render() {
    return (
      <Fragment>
        <MainTitle title="Meet Joseph" />
        <Media query={{ maxWidth: 920 }} render={this.renderMobile} />
        <Media query={{ minWidth: 921 }} render={this.renderGrid} />
      </Fragment>
    );
  }
}

export default Home;

Home.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};

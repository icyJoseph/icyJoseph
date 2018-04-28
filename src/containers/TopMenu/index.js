import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

export class TopMenu extends Component {
  state = { activeItem: "home" };

  handleClick = this.handleClick.bind(this);

  handleClick(e, { name }) {
    this.props.history.push(`/${name === "home" ? "" : name}`);
    return this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid widths={3} inverted style={{ borderRadius: 0 }}>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleClick}
        />
        <Menu.Item
          name="blog"
          active={activeItem === "blog"}
          onClick={this.handleClick}
        />
        <Menu.Item
          name="hacks"
          active={activeItem === "hacks"}
          onClick={this.handleClick}
        />
      </Menu>
    );
  }
}

export default withRouter(connect(undefined, null)(TopMenu));

TopMenu.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

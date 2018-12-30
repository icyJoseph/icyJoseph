import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { head, pipe, curryRight, split, take } from "../../functional";

const takeSecond = take(1, 1);
const splitDash = curryRight(split)("/");

export class TopMenu extends Component {
  state = { activeItem: "home" };

  componentDidMount() {
    const { pathname } = this.props.location;
    const activeItem = pipe(
      splitDash,
      takeSecond,
      head
    )(pathname);
    return this.setState({ activeItem });
  }

  handleClick = this.handleClick.bind(this);

  handleClick(e, { name }) {
    this.props.history.push(`/${name === "home" ? "" : name}`);
    return this.setState({ activeItem: name });
  }

  render() {
    // const { activeItem } = this.state;

    return (
      <ul style={{ background: "transparent" }}>
        <li
          name="home"
          // active={activeItem === "home"}
          onClick={this.handleClick}
        />
        <li
          name="blog"
          // active={activeItem === "blog"}
          onClick={this.handleClick}
        />
        <li
          name="coding"
          // active={activeItem === "coding"}
          onClick={this.handleClick}
        />
      </ul>
    );
  }
}

export default withRouter(TopMenu);

TopMenu.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

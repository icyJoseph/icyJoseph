import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode } from "@fortawesome/free-solid-svg-icons";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavBar, NavItems } from "../../components/Nav";
import { TextCycle } from "../../components/TextCycle";
import { head, pipe, curryRight, split, take } from "../../functional";

import brand from "../../assets/featured/web.png";

const takeSecond = take(1, 1);
const splitDash = curryRight(split)("/");

export class TopMenu extends Component {
  state = { activeItem: "" };

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

  handleClick(e, name) {
    this.props.history.push(`/${name}`);
    return this.setState({ activeItem: name }, () => this.navigateTo(name));
  }

  navigateTo(path) {
    return this.props.history.push(`/${path}`);
  }

  render() {
    // const { activeItem } = this.state;
    const { repoUrls, repos, topics } = this.props;

    return (
      <NavBar>
        <div>
          <img
            src={brand}
            alt="brand"
            onClick={curryRight(this.handleClick)("")}
          />
          <TextCycle tags={repos} subtags={topics} homepages={repoUrls} />
        </div>
        <NavItems>
          <li
            // active={activeItem === ""}
            onClick={curryRight(this.handleClick)("")}
          >
            <button>
              <FontAwesomeIcon icon={faHome} />
            </button>
          </li>
          <li
            // active={activeItem === "blog"}
            onClick={curryRight(this.handleClick)("blog")}
          >
            <button>
              <FontAwesomeIcon icon={faMediumM} />
            </button>
          </li>
          <li
            // active={activeItem === "blog"}
            onClick={curryRight(this.handleClick)("hacks")}
          >
            <button>
              <FontAwesomeIcon icon={faCode} />
            </button>
          </li>
        </NavItems>
      </NavBar>
    );
  }
}

const mapStateToProps = ({ github: { repos, topics } }) => ({
  repos: repos.map(({ name }) => name),
  repoUrls: repos.reduce(
    (prev, { name, html_url }) => ({
      ...prev,
      [name]: html_url
    }),
    {}
  ),
  topics: topics.reduce((prev, curr) => ({ ...prev, ...curr }), {})
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withRouter
)(TopMenu);

TopMenu.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

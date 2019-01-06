import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";
import { NavBar, NavItems } from "../../components/Nav";
import { TextCycle } from "../../components/TextCycle";
import { head, pipe, curryRight, split, take } from "../../functional";
import { softTopScroll } from "../../helpers";
import brand from "../../assets/featured/web.png";

const takeSecond = take(1, 1);
const splitDash = curryRight(split)("/");

export class TopMenu extends Component {
  state = { activeItem: "", scrolled: false };

  componentDidMount() {
    window.addEventListener("scroll", this.toggleScrolled);
    const { pathname } = this.props.location;
    const activeItem = pipe(
      splitDash,
      takeSecond,
      head
    )(pathname);
    return this.setState({ activeItem });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.showButton);
  }

  handleClick = this.handleClick.bind(this);
  toggleScrolled = this.toggleScrolled.bind(this);

  handleClick(e, name) {
    const { activeItem } = this.state;
    if (activeItem !== name) {
      return this.setState({ activeItem: name }, () => this.navigateTo(name));
    }
    return null;
  }

  toggleScrolled() {
    const { scrolled } = this.state;
    if (window.scrollY > 100) {
      return !scrolled && this.setState({ scrolled: true });
    }
    return scrolled && this.setState({ scrolled: false });
  }

  navigateTo(path) {
    return this.props.history.push(`/${path}`);
  }

  render() {
    const { activeItem, scrolled } = this.state;
    const { repoUrls, repos, topics } = this.props;

    return (
      <NavBar scrolled={scrolled}>
        <div>
          <img
            src={brand}
            alt="brand"
            onClick={curryRight(this.handleClick)("")}
          />
          <TextCycle tags={repos} subtags={topics} homepages={repoUrls} />
        </div>
        <NavItems>
          <li className={scrolled && activeItem === "" ? "flipped" : ""}>
            <button
              className={activeItem === "" ? "active" : ""}
              onClick={curryRight(this.handleClick)("")}
            >
              <FontAwesomeIcon icon={faHome} />
            </button>
            {activeItem === "" && (
              <button
                className={activeItem === "" ? "active" : ""}
                onClick={softTopScroll}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            )}
          </li>
          <li className={scrolled && activeItem === "blog" ? "flipped" : ""}>
            <button
              className={activeItem === "blog" ? "active" : ""}
              onClick={curryRight(this.handleClick)("blog")}
            >
              <FontAwesomeIcon icon={faMediumM} />
            </button>
            {activeItem === "blog" && (
              <button
                className={activeItem === "blog" ? "active" : ""}
                onClick={softTopScroll}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            )}
          </li>
          <li className={scrolled && activeItem === "hacks" ? "flipped" : ""}>
            <button
              className={activeItem === "hacks" ? "active" : ""}
              onClick={curryRight(this.handleClick)("hacks")}
            >
              <FontAwesomeIcon icon={faCode} />
            </button>
            {activeItem === "hacks" && (
              <button
                className={activeItem === "hacks" ? "active" : ""}
                onClick={softTopScroll}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            )}
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

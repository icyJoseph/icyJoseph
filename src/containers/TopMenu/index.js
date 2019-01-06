import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { faHome, faCode } from "@fortawesome/free-solid-svg-icons";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";
import { NavBar, NavItems, NavItem } from "../../components/Nav";
import { TextCycle } from "../../components/TextCycle";
import { head, pipe, curryRight, split, take } from "../../functional";
import { softTopScroll } from "../../helpers";
import brand from "../../assets/featured/web.png";

const takeSecond = take(1, 1);
const splitDash = curryRight(split)("/");

export class TopMenu extends Component {
  state = { activeItem: "", scrolled: false };

  handleClick = this.handleClick.bind(this);
  toggleScrolled = this.toggleScrolled.bind(this);
  navigateTo = this.navigateTo.bind(this);

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
    const { scrolled } = this.state;
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
          {[
            { name: "", icon: faHome },
            { name: "blog", icon: faMediumM },
            { name: "hacks", icon: faCode }
          ].map(({ name, icon }) => (
            <NavItem
              key={name}
              name={name}
              {...this.state}
              mainHandler={this.handleClick}
              subHandler={softTopScroll}
              icon={icon}
            />
          ))}
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

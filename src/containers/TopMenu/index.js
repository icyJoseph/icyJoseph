import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { faHome, faCode } from "@fortawesome/free-solid-svg-icons";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";

import { NavBar, NavItems, NavItem } from "../../components/Nav";
import Brand from "../../components/Brand";

import { curryRight } from "../../functional";
import { softTopScroll, onScrollThreshold } from "../../helpers";

import brand from "../../assets/featured/web.png";

export class TopMenu extends Component {
  state = { activeItem: "", scrolled: false };

  toggleScrolled = onScrollThreshold.bind(this, "scrolled");
  handleClick = this.handleClick.bind(this);

  componentDidMount() {
    window.addEventListener("scroll", this.toggleScrolled);

    const {
      match: {
        params: { activeItem = "" }
      }
    } = this.props;

    return this.setState({ activeItem });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleScrolled);
  }

  handleClick(e, path) {
    const { activeItem } = this.state;
    const {
      history: { push }
    } = this.props;

    if (activeItem !== path) {
      return this.setState({ activeItem: path }, () => push(`/${path}`));
    }
    return null;
  }

  render() {
    const { scrolled } = this.state;
    const { repos, links } = this.props;

    return (
      <NavBar scrolled={scrolled}>
        <Brand
          brand={brand}
          titles={repos}
          links={links}
          clickHandler={curryRight(this.handleClick)("")}
        />
        <NavItems>
          {[
            { name: "", icon: faHome },
            { name: "blog", icon: faMediumM },
            { name: "hacks", icon: faCode }
          ].map(({ name, icon }) => (
            <NavItem
              key={name}
              name={name}
              mainHandler={this.handleClick}
              subHandler={softTopScroll}
              icon={icon}
              {...this.state}
            />
          ))}
        </NavItems>
      </NavBar>
    );
  }
}

export const mapStateToProps = ({ github: { repos } }) => ({
  repos: repos.map(({ name }) => name),
  links: repos.reduce(
    (prev, { name, html_url }) => ({
      ...prev,
      [name]: html_url
    }),
    {}
  )
});

export default connect(mapStateToProps)(TopMenu);

TopMenu.propTypes = {
  repos: PropTypes.array,
  links: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

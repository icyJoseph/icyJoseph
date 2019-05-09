import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { faHome, faCode } from "@fortawesome/free-solid-svg-icons";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";

import { NavBar, NavItems, NavItem } from "../../components/Nav";
import Brand from "../../components/Brand";

import { curryRight } from "../../functional";
import { softTopScroll, onScrollThreshold } from "../../helpers";

import brand from "../../assets/web.png";

export function TopMenu({ match, history, repos = [], links = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const {
    params: { activeItem: routeActiveItem = "" }
  } = match;

  const toggleScrolled = () => onScrollThreshold(scrolled, setScrolled);

  useEffect(() => {
    window.addEventListener("scroll", toggleScrolled);
    return () => window.removeEventListener("scroll", toggleScrolled);
  });

  useEffect(() => {
    setActiveItem(routeActiveItem);
  }, [routeActiveItem]);

  useEffect(() => {
    history.push(`/${activeItem}`);
  }, [history, activeItem]);

  function handleClick(_, path) {
    return setActiveItem(path);
  }

  return (
    <NavBar scrolled={scrolled}>
      <Brand
        brand={brand}
        titles={repos}
        links={links}
        clickHandler={curryRight(handleClick)("")}
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
            mainHandler={handleClick}
            subHandler={softTopScroll}
            icon={icon}
            activeItem={activeItem}
            scrolled={scrolled}
          />
        ))}
      </NavItems>
    </NavBar>
  );
}

export const mapStateToProps = ({ github: { repos } }) => {
  return repos.reduce(
    ({ repos: prevRepos, links: prevLinks }, { name, html_url }) => {
      return {
        repos: [...prevRepos, name],
        links: { ...prevLinks, [name]: html_url }
      };
    },
    { repos: ["icyJoseph"], links: { icyJoseph: "/" } }
  );
};

export default connect(mapStateToProps)(TopMenu);

TopMenu.propTypes = {
  repos: PropTypes.array,
  links: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

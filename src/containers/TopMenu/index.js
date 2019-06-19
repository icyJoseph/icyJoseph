import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { faHome, faCode, faWifi } from "@fortawesome/free-solid-svg-icons";
import { faMediumM } from "@fortawesome/free-brands-svg-icons";

import { NavBar, NavItems, NavItem } from "../../components/Nav";
import Brand from "../../components/Brand";
import { useOnline } from "../Online";
import { curryRight } from "../../functional";
import { softTopScroll, onScrollThreshold } from "../../helpers";

import brand from "../../assets/web.png";

export function TopMenu({ match, history, repos = [], links = {} }) {
  const [scrolled, setScrolled] = useState(false);

  const online = useOnline();

  const {
    params: { activeItem = "" }
  } = match;

  useEffect(() => {
    const toggleScrolled = () => onScrollThreshold(setScrolled);
    window.addEventListener("scroll", toggleScrolled);
    return () => window.removeEventListener("scroll", toggleScrolled);
  }, []);

  const handleClick = useCallback((_, path) => history.push(path), [history]);

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
          { title: "Home", name: "", icon: faHome },
          { title: "Blog", name: "blog", icon: faMediumM },
          { title: "Code", name: "hacks", icon: faCode },
          { title: "offline", name: "network", icon: faWifi, display: !online }
        ]
          .filter(({ display = true }) => display)
          .map(({ name, icon, title }) => (
            <NavItem
              key={name}
              title={title}
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

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withGitHub from "../GitHubHoC";
import codingBackground from "./codingBackground.jpg";

import { Background, Mask } from "../../components/Background";
import MainTitle from "../../components/MainTitle";
import Dock from "../../components/Dock";
import Drawer from "../../components/Drawer";

import { curry, curryRight, filterf, head, pipe } from "../../functional";

const isEqualId = (test, { id }) => id === test;

export const Hacks = ({
  visibility,
  contentId,
  closeDrawer,
  openDrawer,
  data,
  desktop
}) => {
  const filteredData = data.filter(d => !d.hide);

  const { Content, background } = pipe(
    curry(isEqualId),
    curryRight(filterf)(data),
    head
  )(contentId);

  return (
    <Fragment>
      <Background desktop={desktop} background={codingBackground} />
      <Mask tint={0.8} />
      <MainTitle title="Coding" />
      <Dock clickHandler={openDrawer} items={filteredData} />
      <Drawer
        visibility={visibility}
        Content={Content}
        background={background}
        close={closeDrawer}
      />
    </Fragment>
  );
};

export default withGitHub(Hacks);

Hacks.propTypes = {
  visibility: PropTypes.bool,
  contentId: PropTypes.number,
  closeDrawer: PropTypes.func,
  openDrawer: PropTypes.func,
  data: PropTypes.array
};

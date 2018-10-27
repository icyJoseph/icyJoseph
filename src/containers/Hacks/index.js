import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withGitHub from "../GitHubHoC";

import { Background, Mask, Container } from "../../components/Background";
import MainTitle from "../../components/MainTitle";
import Dock from "../../components/Dock";
import HacksContainer from "../../components/HacksContainer";

import { curry, curryRight, filterf, head, pipe } from "../../functional";
import codingBackground from "../../assets/images/codingBackground.jpg";

const isEqualId = (test, { id }) => id === test;

export const Hacks = ({ contentId, openDrawer, data, desktop, github }) => {
  const filteredData = data.filter(d => !d.hide);

  const { Content } = pipe(
    curry(isEqualId),
    curryRight(filterf)(data),
    head
  )(contentId);

  return (
    <Fragment>
      <Background desktop={desktop} background={codingBackground} />
      <Mask desktop={desktop} tint={0.5} />
      <Container>
        <MainTitle title="Coding" subtitle="About me and my code" center />
        <Dock clickHandler={openDrawer} items={filteredData} />
        <HacksContainer Content={Content} github={github} />
      </Container>
    </Fragment>
  );
};

export default withGitHub(Hacks);

Hacks.propTypes = {
  contentId: PropTypes.number,
  openDrawer: PropTypes.func,
  data: PropTypes.array
};

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withGitHub from "../GitHubHoC";

import { Background, Mask, ContentWrap } from "../../components/Background";
import MainTitle from "../../components/MainTitle";
import Dock from "../../components/Dock";
import HacksContainer from "../../components/HacksContainer";

import { curry, curryRight, filterf, head, pipe } from "../../functional";
import codingBackground from "../../assets/images/codingBackground.jpg";

const isEqualId = (contentId, { id }) => id === contentId;

export const Hacks = ({ contentId, openDrawer, data, desktop, github }) => {
  const filteredData = data.filter(d => !d.hide);

  const { Content } = pipe(
    curry(isEqualId), // -> pass this function as the next argument
    curryRight(filterf)(data),
    head
  )(contentId);

  return (
    <Fragment>
      <Background desktop={desktop} background={codingBackground} />
      <Mask desktop={desktop} tint={0.5} />
      <ContentWrap>
        <MainTitle title="Coding" subtitle="About me and my code" center />
        <Dock
          clickHandler={openDrawer}
          items={filteredData}
          contentId={contentId}
        />
        <HacksContainer Content={Content} github={github} />
      </ContentWrap>
    </Fragment>
  );
};

export default withGitHub(Hacks);

Hacks.propTypes = {
  contentId: PropTypes.number,
  openDrawer: PropTypes.func,
  data: PropTypes.array
};

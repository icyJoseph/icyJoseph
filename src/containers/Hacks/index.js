import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Sidebar } from "semantic-ui-react";
import withGitHub from "../GitHubHoC";
import codingBackground from "./codingBackground.jpg";
import { Background } from "../Landing/styled";

import MainTitle from "../../components/MainTitle";
import HexGrid from "../../components/HexGrid";
import Drawer from "../../components/Drawer";

import { Pushable } from "./styled";
import { shadow } from "../../constants";
import {
  curry,
  curryRight,
  filterf,
  head,
  mapValueToFunctions,
  take,
  pipe
} from "../../functional";

const isEqualId = (test, { id }) => id === test;
const takeFirstRow = take(2, 0);
const takeSecondRow = take(3, 2);
const takeThirdRow = take(2, 5);

export const Hacks = ({
  visibility,
  contentId,
  closeDrawer,
  openDrawer,
  data
}) => {
  const [firstRow, secondRow, thirdRow] = mapValueToFunctions(
    takeFirstRow,
    takeSecondRow,
    takeThirdRow
  )(data);

  const { Content, background } = pipe(
    curry(isEqualId),
    curryRight(filterf)(data),
    head
  )(contentId);

  return (
    <Fragment>
      <Pushable>
        <Background background={codingBackground} />
        <Drawer
          visibility={visibility}
          Content={Content}
          background={background}
          close={closeDrawer}
        />
        <Sidebar.Pusher
          style={{
            background: shadow,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <MainTitle title="Coding/Hacks" />
          <HexGrid
            clickHandler={openDrawer}
            rows={[firstRow, secondRow, thirdRow]}
          />
        </Sidebar.Pusher>
      </Pushable>
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

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Sidebar, Segment } from "semantic-ui-react";

import Background from "./codingBackground.jpg";

import MainTitle from "../../components/MainTitle";
import HexGrid from "../../components/HexGrid";
import Drawer from "../../components/Drawer";

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
const takeFirstRow = take(3, 0);
const takeSecondRow = take(4, 3);
const takeThirdRow = take(3, 7);

export const HomeDesktopGrid = ({
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
      <Sidebar.Pushable
        as={Segment}
        style={{
          minHeight: "600px",
          height: "calc(100vh - 100px)",
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          marginTop: "0px",
          borderRadius: 0,
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover"
        }}
      >
        <MainTitle title="Meet Joseph" desktop />
        <Drawer
          visibility={visibility}
          Content={Content}
          background={background}
          close={closeDrawer}
        />
        <Sidebar.Pusher
          style={{
            background: "rgba(0,0,0,0)",
            marginTop: "5%"
          }}
        >
          <HexGrid
            clickHandler={openDrawer}
            rows={[firstRow, secondRow, thirdRow]}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Fragment>
  );
};

export default HomeDesktopGrid;

HomeDesktopGrid.propTypes = {
  visibility: PropTypes.bool,
  contentId: PropTypes.number,
  closeDrawer: PropTypes.func,
  openDrawer: PropTypes.func,
  data: PropTypes.array
};

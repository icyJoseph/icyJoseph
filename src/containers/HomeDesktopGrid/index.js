import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Sidebar, Segment } from "semantic-ui-react";

import Background from "./codingBackground.jpg";

import MainTitle from "../../components/MainTitle";
import HexGrid from "../../components/HexGrid";
import Drawer from "../../components/Drawer";

import { head, take } from "../../functional";

export const HomeDesktopGrid = ({
  visibility,
  contentId,
  closeDrawer,
  openDrawer,
  data
}) => {
  const [firstRow, secondRow, thirdRow] = [
    take(3, 0),
    take(4, 3),
    take(3, 7)
  ].map(f => f(data));

  const { Content } = head(data.filter(d => d.id === contentId));
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
        <Drawer visibility={visibility} Content={Content} close={closeDrawer} />
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

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Sidebar, Segment } from "semantic-ui-react";

import Background from "./codingBackground.jpg";

import MainTitle from "../../components/MainTitle";
import HexGrid from "../../components/HexGrid";
import SideContent from "../../components/SideContent";

export const HomeDesktopGrid = ({
  visibility,
  Content,
  closeSideContent,
  openSideContent,
  data: { firstRow, secondRow, thirdRow }
}) => {
  return (
    <Fragment>
      <Sidebar.Pushable
        as={Segment}
        style={{
          border: "none",
          boxShadow: "none",
          height: "calc(100vh - 40px)",
          marginTop: "0px",
          borderRadius: 0,
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover"
        }}
      >
        <SideContent
          visibility={visibility}
          Content={Content}
          close={closeSideContent}
        />
        <Sidebar.Pusher
          style={{
            background: "rgba(0,0,0,0)"
          }}
        >
          <MainTitle title="Meet Joseph" desktop />
          <HexGrid
            clickHandler={openSideContent}
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
  Content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  closeSideContent: PropTypes.func,
  openSideContent: PropTypes.func,
  data: PropTypes.shape({
    firstRow: PropTypes.arr,
    secondRow: PropTypes.arr,
    thirdRow: PropTypes.arr
  })
};

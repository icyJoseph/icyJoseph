import React from "react";
import PropTypes from "prop-types";
import { TabletWrapper } from "./styled";
import MainTitle from "../../components/MainTitle";
import { Statistics } from "../../components/Statistics";
import TimeLine from "../../components/TimeLine";

export const Tablet = ({
  visibility,
  Content,
  closeDrawer,
  openDrawer,
  data: { firstRow, secondRow, thirdRow }
}) => {
  return (
    <TabletWrapper>
      <MainTitle title="Meet Joseph" />
      <Statistics />
      <TimeLine data={[...firstRow, ...secondRow, ...thirdRow]} />
    </TabletWrapper>
  );
};

export default Tablet;

Tablet.propTypes = {
  visibility: PropTypes.bool,
  Content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  closeDrawer: PropTypes.func,
  openDrawer: PropTypes.func,
  data: PropTypes.shape({
    firstRow: PropTypes.arr,
    secondRow: PropTypes.arr,
    thirdRow: PropTypes.arr
  })
};

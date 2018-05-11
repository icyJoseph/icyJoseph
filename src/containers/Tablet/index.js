import React from "react";
import PropTypes from "prop-types";
import { TabletWrapper } from "./styled";
import MainTitle from "../../components/MainTitle";
import TimeLine from "../../components/TimeLine";

export const Tablet = ({
  visibility,
  Content,
  closeSideContent,
  openSideContent,
  data: { firstRow, secondRow, thirdRow }
}) => {
  return (
    <TabletWrapper>
      <MainTitle title="Meet Joseph" />
      <TimeLine data={[...firstRow, ...secondRow, ...thirdRow]} />
    </TabletWrapper>
  );
};

export default Tablet;

Tablet.propTypes = {
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

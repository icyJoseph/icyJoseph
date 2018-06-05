import React from "react";
import PropTypes from "prop-types";

import Loadable from "react-loadable";
import { TabletWrapper } from "./styled";
import MainTitle from "../../components/MainTitle";
import Spinner from "../../components/Loading/Spinner";

const AsyncStatistics = Loadable({
  loader: () => import("../../components/Statistics"),
  loading: Spinner,
  delay: 600
});

const AsyncTimeLine = Loadable({
  loader: () => import("../../components/TimeLine"),
  loading: Spinner,
  delay: 600
});

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
      <AsyncStatistics />
      <AsyncTimeLine data={[...firstRow, ...secondRow, ...thirdRow]} />
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

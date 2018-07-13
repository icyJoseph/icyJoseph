import React, { Fragment } from "react";
import Grid from "../Grid";

import Tablet from "../Tablet";
import TimeLine from "../../data/TimeLine";

export const Desktop = ({ ...props }) => {
  return (
    <Fragment>
      <Tablet data={TimeLine} desktop />
      <Grid {...props} />
    </Fragment>
  );
};

export default Desktop;

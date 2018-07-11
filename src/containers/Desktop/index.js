import React, { Fragment } from "react";
import HomeDesktopGrid from "../HomeDesktopGrid";

import Tablet from "../Tablet";
import TimeLine from "../../data/TimeLine";

// THE APP is attempting to fetch from github without token
export const Desktop = ({ ...props }) => {
  return (
    <Fragment>
      <Tablet data={TimeLine} desktop />
      <HomeDesktopGrid {...props} />
    </Fragment>
  );
};

export default Desktop;

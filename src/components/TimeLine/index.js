import React, { Fragment } from "react";
import Event from "./Event";

export const TimeLine = ({ data }) => {
  const description =
    "Worked as CTO for Enatics Sports AB. This is a very long description with the only purpose of testing.";

  return (
    <Fragment>
      <Event left title="Joseph" meta="CTO" description={description} />
      <Event title="Joseph" meta="CTO" description={description} />
      <Event left title="Joseph" meta="CTO" description={description} />
      <Event title="Joseph" meta="CTO" description={description} />
      <Event left title="Joseph" meta="CTO" description={description} />
    </Fragment>
  );
};

export default TimeLine;

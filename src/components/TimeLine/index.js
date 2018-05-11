import React, { Fragment } from "react";
import Element from "./Element";

export const TimeLine = ({ data }) => {
  const description =
    "Worked as CTO for Enatics Sports AB. This is a very long description with the only purpose of testing.";

  return (
    <Fragment>
      <Element left title="Joseph" meta="CTO" description={description} />
      <Element title="Joseph" meta="CTO" description={description} />
      <Element left title="Joseph" meta="CTO" description={description} />
      <Element title="Joseph" meta="CTO" description={description} />
      <Element left title="Joseph" meta="CTO" description={description} />
    </Fragment>
  );
};

export default TimeLine;

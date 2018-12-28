import React from "react";

export const Spinner = ({ pastDelay, error }) => {
  return pastDelay ? <Loader active inline="centered" /> : null;
};

export default Spinner;

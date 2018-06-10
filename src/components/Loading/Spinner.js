import React from "react";
import { Loader } from "semantic-ui-react";

export const Spinner = ({ pastDelay, error }) => {
  return pastDelay ? <Loader active inline="centered" /> : null;
};

export default Spinner;
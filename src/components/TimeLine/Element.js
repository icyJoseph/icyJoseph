import React, { Fragment } from "react";
import { Card } from "./Card";
import { Point, Line } from "./styled";

export const Element = ({ title, meta, description, left }) => {
  return (
    <Fragment>
      <Point />
      <Line>
        <Card left={left} title={title} meta={meta} description={description} />
      </Line>
    </Fragment>
  );
};
export default Element;

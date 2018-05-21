import React, { Component, Fragment } from "react";
import AnimateHeight from "react-animate-height";
import { Card } from "./Card";
import { Point, Line } from "./styled";

export class Event extends Component {
  state = {
    height: 20,
    lineHeight: 60
  };

  toggle = this.toggle.bind(this);
  toggle() {
    const { height, lineHeight } = this.state;

    this.setState({
      height: height === 20 ? "auto" : 20,
      lineHeight: lineHeight === 60 ? "auto" : 60
    });
  }

  render() {
    const { height, lineHeight } = this.state;
    const { title, meta, description, left } = this.props;
    return (
      <Fragment>
        <Point />
        <AnimateHeight duration={500} height={lineHeight}>
          <Line>
            <Card
              left={left}
              title={title}
              meta={meta}
              description={description}
              height={height}
              toggle={this.toggle}
            />
          </Line>
        </AnimateHeight>
      </Fragment>
    );
  }
}
export default Event;

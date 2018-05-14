import React, { Component, Fragment } from "react";
import AnimateHeight from "react-animate-height";
import { Card } from "./Card";
import { Point, Line } from "./styled";

export class Event extends Component {
  state = {
    height: 0
  };

  toggle = this.toggle.bind(this);
  toggle() {
    const { height } = this.state;

    this.setState({
      height: height === 0 ? "auto" : 0
    });
  }

  render() {
    const { height } = this.state;
    const { title, meta, description, left } = this.props;
    return (
      <Fragment>
        <Point onClick={this.toggle} />
        <AnimateHeight duration={500} height={height}>
          <Line>
            <Card
              left={left}
              title={title}
              meta={meta}
              description={description}
            />
          </Line>
        </AnimateHeight>
      </Fragment>
    );
  }
}
export default Event;

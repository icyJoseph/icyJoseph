import React, { Component } from "react";
import { Card } from "./Card";
import { Connection, Point, Line, TimeWrapper } from "./styled";

export class Event extends Component {
  state = {
    height: 1
  };

  toggle = this.toggle.bind(this);
  toggle() {
    const { height } = this.state;

    this.setState({
      height: height === 1 ? "auto" : 1
    });
  }

  renderCard = this.renderCard.bind(this);
  renderCard() {
    const { height } = this.state;
    const { title, meta, description, experience } = this.props;

    return (
      <Card
        title={title}
        meta={meta}
        description={description}
        height={height}
        toggle={this.toggle}
        experience={experience}
      />
    );
  }

  renderLineAndPoint = this.renderLineAndPoint.bind(this);
  renderLineAndPoint() {
    return (
      <Connection>
        <Point />
        <Line />
        <Point />
      </Connection>
    );
  }
  render() {
    const { last } = this.props;
    return (
      <TimeWrapper>
        {this.renderCard()}
        {!last && this.renderLineAndPoint()}
      </TimeWrapper>
    );
  }
}
export default Event;

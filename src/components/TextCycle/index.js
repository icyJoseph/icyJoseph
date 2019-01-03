import React, { Component } from "react";
import { Fader } from "./styled";
import { curry } from "../../functional";

const safeInc = (max, curr) => {
  const next = curr + 1;
  if (next >= max) {
    return 0;
  }
  return next;
};

export class TextCycle extends Component {
  state = {
    index: 0,
    time: 4
  };

  interval = null;

  componentDidMount() {
    const { tags } = this.props;
    const safeTagsInc = curry(safeInc)(tags.length);
    this.interval = setInterval(
      () => this.setState(prev => ({ index: safeTagsInc(prev.index) })),
      this.state.time * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { index, time } = this.state;
    const { tags, homepages } = this.props;
    const current = tags[index];
    const href = homepages[current];

    return (
      <Fader time={time}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {tags[index]}
        </a>
      </Fader>
    );
  }
}

export default TextCycle;

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
    this.interval = setInterval(() => {
      const { titles } = this.props;
      const safeTitlesInc = curry(safeInc)(titles.length);
      return this.setState(prev => ({ index: safeTitlesInc(prev.index) }));
    }, this.state.time * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { index, time } = this.state;
    const { titles, links } = this.props;
    const current = titles[index];
    const href = links[current];
    const target = href === "/" ? "" : "_blank";

    return (
      <Fader time={time}>
        <a href={href} target={target} rel="noopener noreferrer">
          {current}
        </a>
      </Fader>
    );
  }
}

export default TextCycle;

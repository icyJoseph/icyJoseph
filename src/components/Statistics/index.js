import React, { Fragment } from "react";
import CountUp from "react-countup";
import Statistic from "semantic-ui-react/dist/commonjs/views/Statistic";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

export const Statistics = () => (
  <Fragment>
    <Statistic.Group inverted widths="three" style={{ margin: "15px 0" }}>
      <Statistic>
        <Statistic.Value>
          <Icon name="github" />
          <CountUp start={0} end={5} />
        </Statistic.Value>
        <Statistic.Label>Repos</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>
          <CountUp start={0} end={4} />
        </Statistic.Value>
        <Statistic.Label>Hacks</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>
          <CountUp start={0} end={700} />
        </Statistic.Value>
        <Statistic.Label>Commits</Statistic.Label>
      </Statistic>
    </Statistic.Group>
    <Statistic.Group inverted widths="two" style={{ margin: "15px 0" }}>
      <Statistic>
        <Statistic.Value>
          <CountUp start={0} end={8000} />
        </Statistic.Value>
        <Statistic.Label>Javascript Bytes</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>
          <CountUp start={0} end={1000} />
        </Statistic.Value>
        <Statistic.Label>Python Bytes</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </Fragment>
);

export default Statistics;

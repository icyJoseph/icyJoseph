import React, { Fragment } from "react";
import { Icon, Statistic } from "semantic-ui-react";

export const Statistics = () => (
  <Fragment>
    <Statistic.Group inverted widths="three" style={{ margin: "15px 0" }}>
      <Statistic>
        <Statistic.Value>
          <Icon name="github" />
          5
        </Statistic.Value>
        <Statistic.Label>Repos</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>42</Statistic.Value>
        <Statistic.Label>Repos</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>700</Statistic.Value>
        <Statistic.Label>Commits</Statistic.Label>
      </Statistic>
    </Statistic.Group>
    <Statistic.Group inverted widths="two" style={{ margin: "15px 0" }}>
      <Statistic>
        <Statistic.Value>80000</Statistic.Value>
        <Statistic.Label>Javascript Bytes</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>1000</Statistic.Value>
        <Statistic.Label>Python Bytes</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </Fragment>
);

export default Statistics;

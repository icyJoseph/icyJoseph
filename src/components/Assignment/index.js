import React from "react";
import { Icon } from "semantic-ui-react";
import MainTitle from "../MainTitle";

export const Assignment = ({ title, subtitle }) => (
  <div
    style={{
      color: "white",
      display: "flex",
      justifyContent: "space-evenly"
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <MainTitle title={title} subtitle={subtitle} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "32px",
        justifyContent: "space-around"
      }}
    >
      <div style={{ display: "flex", margin: "5px" }}>
        <Icon name="coffee" />
        <Icon name="cogs" />
        <Icon name="code" />
        <Icon name="react" />
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "5px" }}>
        <Icon name="arrow down" />
      </div>
      <div style={{ display: "flex", margin: "5px" }}>
        <Icon name="computer" />
        <Icon name="mobile alternate" />
        <Icon name="chart bar" />
        <Icon name="truck" />
      </div>
    </div>
  </div>
);

export default Assignment;

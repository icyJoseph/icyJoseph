import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import BrainStorm from "../../logos/BrainStorm";

export const Hacks = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: "100%"
      }}
    >
      <svg width="400px" height="400px" viewBox="0 0 550 550">
        <BrainStorm />
      </svg>
    </div>
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        marginTop: 20
      }}
    >
      <Header as="h3" block>
        Coming soon!
      </Header>
    </div>
  </div>
);

export default Hacks;

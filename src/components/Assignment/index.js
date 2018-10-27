import React from "react";
import MainTitle from "../MainTitle";

// Describes current worklife
export const Assignment = ({ titles }) => (
  <div
    style={{
      color: "white",
      display: "flex",
      justifyContent: "space-evenly"
    }}
  >
    {titles.map(({ title, subtitle }) => (
      <div
        key={title}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MainTitle title={title} subtitle={subtitle} />
      </div>
    ))}
  </div>
);

export default Assignment;

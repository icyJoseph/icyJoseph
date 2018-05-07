import React from "react";
import ReactLogo from "../logos/ReactLogo";
import PythonLogo from "../logos/PythonLogo";
import JavaScriptLogo from "../logos/JavaScriptLogo";
import Me from "../logos/Me";

export default {
  firstRow: [
    {
      id: 0,
      Component: ReactLogo,
      fill: "#61DAFB",
      backgroundFill: "#000",
      Content: <p>React Info</p>
    },
    {
      id: 1,
      Component: PythonLogo,
      fill: "#000",
      backgroundFill: "#000",
      Content: <p>Python Info</p>
    },
    {
      id: 2,
      Component: JavaScriptLogo,
      fill: "#F7DF1E",
      backgroundFill: "#F7DF1E",
      Content: <p>Javascript Info</p>
    }
  ],
  secondRow: [
    {
      id: 3,
      Component: ReactLogo,
      fill: "#61DAFB",
      backgroundFill: "#000",
      Content: <p>React Info</p>
    },
    {
      id: 4,
      Component: PythonLogo,
      fill: "#000",
      backgroundFill: "#000",
      Content: <p>Python Info</p>
    },
    {
      id: 5,
      Component: Me,
      fill: "white",
      backgroundFill: "tomato",
      Content: <p>Info About me</p>
    },
    {
      id: 6,
      Component: ReactLogo,
      fill: "#61DAFB",
      backgroundFill: "#000",
      Content: <p>React Info</p>
    }
  ],
  thirdRow: [
    {
      id: 7,
      Component: ReactLogo,
      fill: "#61DAFB",
      backgroundFill: "#000",
      Content: <p>React Info</p>
    },
    {
      id: 8,
      Component: PythonLogo,
      fill: "#000",
      backgroundFill: "#000",
      Content: <p>Python Info</p>
    },
    {
      id: 9,
      Component: JavaScriptLogo,
      fill: "#F7DF1E",
      backgroundFill: "#F7DF1E",
      Content: <p>Javascript Info</p>
    }
  ]
};

import React from "react";
import Loadable from "react-loadable";
import Spinner from "../components/Loading/Spinner";
import Loading from "../logos/Loading";

export default [
  {
    id: 0,
    title: "About Me",
    meta: "Joseph",
    Component: Loadable({
      loader: () => import("../logos/Me"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 1,
    title: "ReactJS",
    meta: "Certified",
    Component: Loadable({
      loader: () => import("../logos/ReactLogo"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#292929",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 2,
    title: "JavaScript",
    meta: "Favorite Language",
    Component: Loadable({
      loader: () => import("../logos/JavaScriptLogo"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#F0DB4F",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 3,
    title: "Redux",
    meta: "Framework",
    Component: Loadable({
      loader: () => import("../logos/Redux"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#292929",
    backgroundFill: "#5159BF",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 4,
    title: "Algorithms",
    meta: "Problem Solving",
    Component: Loadable({
      loader: () => import("../logos/Problem"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 5,
    title: "Work Experience",
    meta: "Career",
    Component: Loadable({
      loader: () => import("../logos/Experience"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 6,
    title: "Python",
    meta: "Code as a hobby",
    Component: Loadable({
      loader: () => import("../logos/PythonLogo"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 7,
    title: "Hacks",
    meta: "Value Creation",
    Component: Loadable({
      loader: () => import("../logos/Rocket"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 8,
    title: "Winner of...",
    meta: "Acknowledgments",
    Component: Loadable({
      loader: () => import("../logos/Award"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#C92F00",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 9,
    title: "Currently",
    meta: "Life as a React Developer",
    Component: Loadable({
      loader: () => import("../logos/Report"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/About"),
      loading() {
        return <Spinner />;
      }
    })
  }
];

import React from "react";
import Loadable from "react-loadable";
import Spinner from "../components/Loading/Spinner";
import Loading from "../logos/Loading";
import TimeLine from "./TimeLine";

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
    background: "#193549",
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
    background: "#193549",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/Portfolio"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} meta="react" type="repos" />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 2,
    title: "JavaScript",
    meta: "Favorite Language",
    background: "#193549",
    Component: Loadable({
      loader: () => import("../logos/JavaScriptLogo"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#F0DB4F",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/Recast"),
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
    background: "#193549",
    backgroundFill: "#5159BF",
    Content: Loadable({
      loader: () => import("../components/Portfolio"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} meta="redux" type="repos" />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 4,
    title: "algorithms",
    meta: "Problem Solving",
    Component: Loadable({
      loader: () => import("../logos/Problem"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    background: "#193549",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/Portfolio"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} meta="algorithms" type="solutions" />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 5,
    title: "experience",
    meta: "My career",
    Component: Loadable({
      loader: () => import("../logos/Experience"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    background: "#193549",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/TimeLine"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} experience data={TimeLine} />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 6,
    title: "python",
    meta: "Code as a hobby",
    Component: Loadable({
      loader: () => import("../logos/PythonLogo"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    background: "#193549",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/Portfolio"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} meta="python" />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 7,
    title: "hackathon",
    meta: "Value Creation",
    Component: Loadable({
      loader: () => import("../logos/Rocket"),
      loading() {
        return <Loading />;
      }
    }),
    fill: "#273B7A",
    background: "#193549",
    backgroundFill: "tomato",
    Content: Loadable({
      loader: () => import("../components/Portfolio"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} meta="hackathon" type="hacks" />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 8,
    title: "awards",
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
      loader: () => import("../components/Common"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} title={"awards"} />;
      },
      loading() {
        return <Spinner />;
      }
    })
  },
  {
    id: 9,
    title: "currently",
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
      loader: () => import("../components/Common"),
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} title={"currently"} />;
      },
      loading() {
        return <Spinner />;
      }
    })
  }
];

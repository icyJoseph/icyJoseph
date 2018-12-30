// import React from "react";
// import Loadable from "react-loadable";
// import Spinner from "../components/Loading/Spinner";
// import SpinLogo from "../logos/Spinner";
// import TimeLine from "./TimeLine";

// export default [
//   {
//     id: 0,
//     title: "About Me",
//     meta: "Joseph",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "AboutMe_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="user" />;
//       }
//     }),
//     fill: "#273B7A",
//     background: "#193549",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "AboutMe_Content"*/ "../components/About"),
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 1,
//     title: "ReactJS",
//     meta: "Certified",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "ReactJS_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="react" />;
//       }
//     }),
//     fill: "#292929",
//     background: "#193549",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "ReactJS_Content"*/ "../components/Portfolio"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} meta="react" type="repos" />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 2,
//     title: "JavaScript",
//     meta: "Favorite Language",
//     background: "#193549",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "JavaScript_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="js" />;
//       }
//     }),
//     fill: "#F0DB4F",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "JavaScript_Content"*/ "../components/Recast"),
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 3,
//     title: "Redux",
//     meta: "Framework",
//     Component: Loadable({
//       loader: () => import(/*webpackChunkName: "Redux_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="react" corner="plug" />;
//       }
//     }),
//     fill: "#292929",
//     background: "#193549",
//     backgroundFill: "#5159BF",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "JavaScript_Content"*/ "../components/Portfolio"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} meta="redux" type="repos" />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 4,
//     title: "algorithms",
//     meta: "Problem Solving",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Algorithms_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="puzzle" />;
//       }
//     }),
//     fill: "#273B7A",
//     background: "#193549",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Algorithms_Content"*/ "../components/Portfolio"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} meta="algorithms" type="solutions" />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 5,
//     hide: true,
//     title: "experience",
//     meta: "My career",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Experience_Component"*/ "../logos/Experience"),
//       loading() {
//         return <SpinLogo />;
//       }
//     }),
//     fill: "#273B7A",
//     background: "#193549",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Experience_Content"*/ "../components/TimeLine"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} experience data={TimeLine} />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 6,
//     title: "python",
//     meta: "Code as a hobby",
//     Component: Loadable({
//       loader: () => import(/*webpackChunkName: "Python_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="python" />;
//       }
//     }),
//     fill: "#273B7A",
//     background: "#193549",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Python_Content"*/ "../components/Portfolio"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} meta="python" type="scripts" />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 7,
//     title: "hackathon",
//     meta: "Value Creation",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Hackathon_Component"*/ "../logos"),
//       loading() {
//         return <SpinLogo />;
//       },
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} name="rocket" />;
//       }
//     }),
//     fill: "#273B7A",
//     background: "#193549",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Hackathon_Content"*/ "../components/Portfolio"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} meta="hackathon" />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 8,
//     hide: true,
//     title: "awards",
//     meta: "Acknowledgments",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Awards_Component"*/ "../logos/Award"),
//       loading() {
//         return <SpinLogo />;
//       }
//     }),
//     fill: "#C92F00",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Awards_Content"*/ "../components/Common"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} title={"awards"} />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   },
//   {
//     id: 9,
//     hide: true,
//     title: "currently",
//     meta: "Life as a React Developer",
//     Component: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Currently_Component"*/ "../logos/Report"),
//       loading() {
//         return <SpinLogo />;
//       }
//     }),
//     fill: "#273B7A",
//     backgroundFill: "tomato",
//     Content: Loadable({
//       loader: () =>
//         import(/*webpackChunkName: "Currently_Content"*/ "../components/Common"),
//       render(loaded, props) {
//         let Component = loaded.default;
//         return <Component {...props} title={"currently"} />;
//       },
//       loading() {
//         return <Spinner />;
//       }
//     })
//   }
// ];

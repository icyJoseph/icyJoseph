import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import BodyLoader from "./components/Loading/BodyLoader";
import HeaderLoader from "./components/Loading/HeaderLoader";
import BottomLoader from "./components/Loading/BottomLoader";

export const AsyncHome = Loadable({
  loader: () => import("./containers/Home"),
  loading: BodyLoader,
  delay: 600
});

export const AsyncApp = Loadable({
  loader: () => import("./containers/App"),
  loading: BodyLoader,
  delay: 600
});

export const AsyncBlog = Loadable({
  loader: () => import("./containers/Blog"),
  loading: BodyLoader,
  delay: 600
});

export const AsyncNoMatch = Loadable({
  loader: () => import("./containers/NoMatch"),
  loading: BodyLoader,
  delay: 600
});

export const AsyncTopMenu = Loadable({
  loader: () => import("./containers/TopMenu"),
  loading: HeaderLoader,
  delay: 600
});

export const AsyncBottomMenu = Loadable({
  loader: () => import("./containers/BottomMenu"),
  loading: BottomLoader,
  delay: 600
});

export const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <AsyncTopMenu />
      <Switch>
        <Route path="/blog" component={AsyncBlog} />
        <Route path="/hacks" component={AsyncApp} />
        <Route path="/" exact component={AsyncHome} />
        <Route component={AsyncNoMatch} />
      </Switch>
      <AsyncBottomMenu />
    </Fragment>
  </BrowserRouter>
);

export default Routes;

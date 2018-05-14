import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import BodyLoader from "./components/Loading/BodyLoader";
import HeaderLoader from "./components/Loading/HeaderLoader";

const asyncHome = Loadable({
  loader: () => import("./containers/Home"),
  loading: BodyLoader,
  delay: 600
});

const asyncApp = Loadable({
  loader: () => import("./containers/App"),
  loading: BodyLoader,
  delay: 600
});

const asyncNoMatch = Loadable({
  loader: () => import("./containers/NoMatch"),
  loading: BodyLoader,
  delay: 600
});

const AsyncTopMenu = Loadable({
  loader: () => import("./containers/TopMenu"),
  loading: HeaderLoader,
  delay: 600
});

export const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <AsyncTopMenu />
      <Switch>
        <Route path="/blog" component={asyncApp} />
        <Route path="/hacks" component={asyncApp} />
        <Route path="/" component={asyncHome} />
        <Route component={asyncNoMatch} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;

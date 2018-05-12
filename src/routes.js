import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import TopMenu from "./containers/TopMenu";

import HomeLoading from "./components/Loading";

const asyncHome = Loadable({
  loader: () => import("./containers/Home"),
  loading: HomeLoading
});

const asyncApp = Loadable({
  loader: () => import("./containers/App"),
  loading: HomeLoading
});

const asyncNoMatch = Loadable({
  loader: () => import("./containers/NoMatch"),
  loading: HomeLoading
});

export const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <TopMenu />
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

import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopMenu from "./containers/TopMenu";
import App from "./containers/App";
import Home from "./containers/Home";
import NoMatch from "./containers/NoMatch";

export const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <TopMenu />
      <Switch>
        <Route path="/blog" component={App} />
        <Route path="/hacks" component={App} />
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;

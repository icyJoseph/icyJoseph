import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  SuspenseTopMenu,
  SuspenseLanding,
  SuspenseBlog,
  SuspenseHacks,
  SuspenseSnackbar,
  SuspenseNoMatch
} from "./lazyRoutes";

import Online from "../containers/Online";
import GlobalStyle from "../theme/globalStyle";

export const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Online>
      <GlobalStyle />
      <Route path="/:activeItem?" component={SuspenseTopMenu} />
      <Route path="/*" component={SuspenseSnackbar} />
      <Switch>
        <Route path="/hacks" exact component={SuspenseHacks} />
        <Route path="/blog" exact component={SuspenseBlog} />
        <Route path="/" exact component={SuspenseLanding} />
        <Route component={SuspenseNoMatch} />
      </Switch>
    </Online>
  </BrowserRouter>
);

export default Routes;

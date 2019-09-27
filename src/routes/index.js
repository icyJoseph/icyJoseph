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
import ErrorBoundary from "../containers/Error";

export const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Online>
      <GlobalStyle />
      <ErrorBoundary>
        <Route path="/:activeItem?" component={SuspenseTopMenu} />
        <Route path="/*" component={SuspenseSnackbar} />
        <Switch>
          <Route path="/hacks" exact component={SuspenseHacks} />
          <Route path="/blog" exact component={SuspenseBlog} />
          <Route path="/" exact component={SuspenseLanding} />
          <Route component={SuspenseNoMatch} />
        </Switch>
      </ErrorBoundary>
    </Online>
  </BrowserRouter>
);

export default Routes;

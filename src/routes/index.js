import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  SuspenseTopMenu,
  SuspenseLanding,
  SuspenseBlog,
  SuspenseHacks,
  SuspenseNoMatch
} from "./lazyRoutes";

import Online from "../containers/Online";
import { Container } from "../components/Container";
import GlobalStyle from "../theme/globalStyle";
// import ServiceWorkerMessage from "./components/ServiceWorkerMessage";

export const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <>
      <GlobalStyle />
      <Online>
        <Route path="/:activeItem?" component={SuspenseTopMenu} />
        <Container>
          <Switch>
            <Route path="/hacks" exact component={SuspenseHacks} />
            <Route path="/blog" exact component={SuspenseBlog} />
            <Route path="/" exact component={SuspenseLanding} />
            <Route component={SuspenseNoMatch} />
          </Switch>
        </Container>
      </Online>
    </>
  </BrowserRouter>
);

export default Routes;

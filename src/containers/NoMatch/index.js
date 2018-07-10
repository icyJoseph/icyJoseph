import React, { Component } from "react";

import { getUserRepos } from "../../ducks/github/api";
import { getToken } from "../../ducks/auth/api";
import { curryRight, head, take, pipe, split } from "../../functional";

import Searching from "./Searching";
import NotFound from "./NotFound";

const takeOne = take(1, 1);
const splitDash = curryRight(split)("/");

export class NoMatch extends Component {
  state = {
    url: null
  };

  setAsyncState(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  async componentDidMount() {
    const {
      location: { pathname }
    } = this.props;

    const possibleRepo = pipe(
      splitDash,
      takeOne,
      head
    )(pathname);

    const token = await getToken();
    const repos = await getUserRepos("icyJoseph", token);

    const existingRepo = repos.find(
      ({ name, homepage }) => name === possibleRepo && homepage
    );

    return this.setAsyncState({
      url: existingRepo && existingRepo.homepage
    });
  }
  render() {
    const { url } = this.state;

    if (url === undefined) return <NotFound />;
    return url !== undefined && <Searching url={url} />;
  }
}
export default NoMatch;

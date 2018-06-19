import { all, fork } from "redux-saga/effects";

import { gitHubSaga } from "../github/saga";
import { gistSaga } from "../gist/saga";
import { authSaga } from "../auth/saga";

export default function* rootSaga() {
  yield all([fork(gitHubSaga), fork(gistSaga), fork(authSaga)]);
}

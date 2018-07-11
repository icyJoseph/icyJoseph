import { all, fork } from "redux-saga/effects";

import { gitHubSaga } from "../github/saga";
import { gistSaga } from "../gist/saga";
import { authSaga } from "../auth/saga";
import { mediumSaga } from "../medium/saga";

export default function* rootSaga() {
  yield all([
    fork(gitHubSaga),
    fork(gistSaga),
    fork(authSaga),
    fork(mediumSaga)
  ]);
}

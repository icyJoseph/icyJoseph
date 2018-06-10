import { all, fork } from "redux-saga/effects";

import { gitHubSaga } from "../github/saga";

export default function* rootSaga() {
  yield all([fork(gitHubSaga)]);
}

import { all, fork } from "redux-saga/effects";

import { gitHubSaga } from "../github/saga";
import { mediumSaga } from "../medium/saga";

export default function* rootSaga() {
  yield all([fork(gitHubSaga), fork(mediumSaga)]);
}

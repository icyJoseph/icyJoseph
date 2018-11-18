import { all, takeLatest, call, put } from "redux-saga/effects";

import { FETCH_GIST, SUCCESS_FETCH_GIST, FAILED_FETCH_GIST } from "./";
import { getGist } from "./api";

export function* loadGist({ payload }) {
  try {
    const gist = yield call(getGist, payload);
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
    yield put({ type: SUCCESS_FETCH_GIST, payload: gist, expiry: inOneHour });
  } catch (error) {
    yield put({ type: FAILED_FETCH_GIST, error });
  }
}

export function* gistSaga() {
  yield all([takeLatest(FETCH_GIST, loadGist)]);
}

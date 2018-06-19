import { takeLatest, call, put } from "redux-saga/effects";
import { getToken } from "./api";
import { SUCCESS_TOKEN, FAILED_TOKEN, FETCH_TOKEN } from "./";

export function* loadToken() {
  try {
    const token = yield call(getToken);
    yield put({ type: SUCCESS_TOKEN, payload: token });
  } catch (error) {
    yield put({ type: FAILED_TOKEN, error });
  }
}

export function* authSaga() {
  yield takeLatest(FETCH_TOKEN, loadToken);
}

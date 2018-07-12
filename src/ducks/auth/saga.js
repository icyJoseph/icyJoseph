import { takeLatest, call, put, select } from "redux-saga/effects";
import { getToken } from "./api";
import {
  selectToken,
  UPDATE_TOKEN,
  SUCCESS_TOKEN,
  FAILED_TOKEN,
  FETCH_TOKEN
} from "./";

export function* loadToken() {
  try {
    const token = yield select(selectToken);
    if (!token) {
      const newToken = yield call(getToken);
      yield put({ type: UPDATE_TOKEN, payload: newToken });
    }
    yield put({ type: SUCCESS_TOKEN });
  } catch (error) {
    yield put({ type: FAILED_TOKEN, error });
  }
}

export function* authSaga() {
  yield takeLatest(FETCH_TOKEN, loadToken);
}

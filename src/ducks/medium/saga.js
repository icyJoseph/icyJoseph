import { all, takeLatest, call, put } from "redux-saga/effects";
import { fetchFeed, fetchPost } from "./api";
import {
  FETCH_FEED,
  FETCH_POST,
  SUCCESS_FEED,
  SUCCESS_POST,
  FAIL_FEED,
  FAIL_POST
} from "./";

export function* loadFeed() {
  try {
    const feed = yield call(fetchFeed);

    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    yield put({ type: SUCCESS_FEED, payload: feed, expiry: inOneHour });
  } catch (error) {
    yield put({ type: FAIL_FEED, error });
  }
}

export function* loadPost({ payload }) {
  try {
    const post = yield call(fetchPost, payload);
    yield put({ type: SUCCESS_POST, payload: post });
  } catch (error) {
    yield put({ type: FAIL_POST, error });
  }
}

export function* mediumSaga() {
  yield all([
    takeLatest(FETCH_FEED, loadFeed),
    takeLatest(FETCH_POST, loadPost)
  ]);
}

import {
  all,
  takeEvery,
  takeLatest,
  call,
  put,
  select,
  take
} from "redux-saga/effects";

import {
  selectRepos,
  selectUser,
  FETCH_USER_REPOS,
  SUCCESS_USER_REPOS,
  FAILED_REPOS,
  FETCH_USER_DATA,
  SUCCESS_USER_DATA,
  FAILED_USER_DATA,
  LOAD_TOTAL_CONTRIBUTIONS,
  LOAD_LANGUAGES
} from "./";

import {
  getUser,
  getUserRepos,
  getRepoContributors,
  getRepoLanguages
} from "./api";

import { curry, flatten, filterf, mapf, pipe, sort } from "../../functional";

export function* loadUser({ payload }) {
  try {
    const user = yield call(getUser, payload);
    yield put({ type: SUCCESS_USER_DATA, payload: user });
  } catch (error) {
    yield put({ type: FAILED_USER_DATA, error });
  }
}

export function* loadRepos({ payload }) {
  try {
    const repos = yield call(getUserRepos, payload);

    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    yield put({ type: SUCCESS_USER_REPOS, payload: repos, expiry: inOneHour });
  } catch (error) {
    yield put({ type: FAILED_REPOS, error });
  }
}

export function* loadContributions() {
  yield all([take(SUCCESS_USER_REPOS), take(SUCCESS_USER_DATA)]);

  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const contributors = yield all(
    repos.map(({ name }) => call(getRepoContributors, login, name))
  );

  const userContributions = flatten(contributors).filter(
    contributor => contributor.login === login
  );

  const totalContributions = userContributions.reduce(
    (acc, { contributions }) => acc + contributions,
    0
  );

  yield put({ type: LOAD_TOTAL_CONTRIBUTIONS, payload: totalContributions });
}

export function* loadLanguages() {
  yield all([take(SUCCESS_USER_REPOS), take(SUCCESS_USER_DATA)]);
  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const ownedByUser = repos.filter(({ owner }) => owner.login === login);
  const languages = yield all(
    ownedByUser.map(({ name }) => call(getRepoLanguages, login, name))
  );

  const aggregate = languages.reduce((acc, val) => {
    return {
      ...acc,
      ...Object.keys(val).reduce(
        (repo, curr) => ({
          ...repo,
          [curr]: acc[curr] ? acc[curr] + val[curr] : val[curr]
        }),
        {}
      )
    };
  }, {});

  const format = pipe(
    Object.keys,
    curry(mapf)(lang => ({
      lang,
      bytes: aggregate[lang]
    })),
    curry(filterf)(({ bytes }) => bytes >= 10000),
    curry(sort)("bytes")
  )(aggregate);

  yield put({ type: LOAD_LANGUAGES, payload: format });
}

export function* gitHubSaga() {
  yield all([
    takeEvery(FETCH_USER_REPOS, loadRepos),
    takeEvery(FETCH_USER_DATA, loadUser),
    takeLatest(FETCH_USER_REPOS, loadContributions),
    takeLatest(FETCH_USER_REPOS, loadLanguages)
  ]);
}

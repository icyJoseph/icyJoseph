import { all, takeLatest, call, put, select, take } from "redux-saga/effects";

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
  LOAD_LANGUAGES,
  FETCH_REPOS_TOPICS,
  SUCCESS_REPOS_TOPICS
} from "./";

import {
  getUser,
  getUserRepos,
  getRepoContributors,
  getRepoLanguages,
  getRepoTopics
} from "./api";

import {
  curry,
  flatten,
  filterf,
  mapf,
  pipe,
  sort,
  keys
} from "../../functional";

const buildLang = (aggregate, lang) => ({
  lang,
  bytes: aggregate[lang]
});

export function* loadUser() {
  try {
    const user = yield call(getUser);
    yield put({ type: SUCCESS_USER_DATA, payload: user });
  } catch (error) {
    yield put({ type: FAILED_USER_DATA, error });
  }
}

export function* loadRepos() {
  try {
    const repos = yield call(getUserRepos);

    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    yield put({ type: SUCCESS_USER_REPOS, payload: repos, expiry: inOneHour });
    yield put({ type: FETCH_REPOS_TOPICS });
  } catch (error) {
    yield put({ type: FAILED_REPOS, error });
  }
}

export function* loadContributions() {
  yield all([take(SUCCESS_USER_REPOS), take(SUCCESS_USER_DATA)]);

  const userContributions = yield call(getRepoContributors);

  const totalContributions = flatten(userContributions).reduce(
    (acc, { contributions }) => acc + contributions,
    0
  );

  yield put({ type: LOAD_TOTAL_CONTRIBUTIONS, payload: totalContributions });
}

export function* loadLanguages() {
  yield all([take(SUCCESS_USER_REPOS), take(SUCCESS_USER_DATA)]);

  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const ownedByUser = repos
    .filter(
      ({ owner, fork, archived }) => owner.login === login && !fork && !archived
    )
    .map(({ name }) => name);

  const languages = yield call(getRepoLanguages, ownedByUser);

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

  const aggregator = curry(buildLang)(aggregate);

  const payload = pipe(
    keys,
    curry(mapf)(aggregator),
    curry(filterf)(({ bytes }) => bytes >= 20000),
    curry(sort)("bytes")
  )(aggregate);

  yield put({ type: LOAD_LANGUAGES, payload });
  yield put({ type: FETCH_REPOS_TOPICS });
}

export function* loadTopics() {
  const repos = yield select(selectRepos);
  const { login } = yield select(selectUser);

  const ownedByUser = repos
    .filter(({ owner }) => owner.login === login)
    .map(({ name }) => name);

  const arrTopics = yield call(getRepoTopics, ownedByUser);

  const topics = arrTopics.reduce((prev, curr) => ({ ...prev, ...curr }), {});

  yield put({ type: SUCCESS_REPOS_TOPICS, payload: { topics } });
}

export function* gitHubSaga() {
  yield all([
    takeLatest(FETCH_USER_REPOS, loadRepos),
    takeLatest(FETCH_USER_DATA, loadUser),
    takeLatest(FETCH_USER_REPOS, loadContributions),
    takeLatest(FETCH_USER_REPOS, loadLanguages),
    takeLatest(FETCH_REPOS_TOPICS, loadTopics)
  ]);
}

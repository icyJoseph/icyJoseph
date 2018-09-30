import { getUser, getUserRepos } from "../api";
import { selectToken } from "../../auth";
import {
  loadUser,
  loadRepos,
  loadContributions,
  loadLanguages,
  gitHubSaga
} from "../saga";
import {
  SUCCESS_USER_DATA,
  FAILED_USER_DATA,
  SUCCESS_USER_REPOS,
  FAILED_REPOS,
  LOAD_TOTAL_CONTRIBUTIONS,
  LOAD_LANGUAGES,
  FETCH_USER_DATA,
  FETCH_USER_REPOS
} from "../";

describe("load user", () => {
  it("loads a user", () => {
    const gen = loadUser({ payload: "user" });
    expect(gen.next().value).toMatchObject({
      TAKE: { pattern: "success_token" }
    });
    expect(gen.next().value).toMatchObject({
      SELECT: {
        selector: selectToken
      }
    });
    expect(gen.next("token").value).toMatchObject({
      CALL: {
        args: ["user", "token"],
        fn: getUser
      }
    });
    expect(gen.next("user").value).toMatchObject({
      PUT: { action: { payload: "user", type: SUCCESS_USER_DATA } }
    });
  });
  it("returns error", () => {
    const gen = loadUser({ payload: "user" });
    gen.next();
    expect(gen.throw("error").value).toMatchObject({
      PUT: { action: { error: "error", type: FAILED_USER_DATA } }
    });
  });
});

describe("load repos", () => {
  it("loads a repo", () => {
    const gen = loadRepos({ payload: "user" });
    expect(gen.next().value).toMatchObject({
      PUT: { action: { type: "fetch_token" } }
    });
    expect(gen.next().value).toMatchObject({
      TAKE: { pattern: "success_token" }
    });
    expect(gen.next("token").value).toMatchObject({
      SELECT: {
        selector: selectToken
      }
    });
    expect(gen.next("token").value).toMatchObject({
      CALL: {
        args: ["user", "token"],
        fn: getUserRepos
      }
    });
    expect(gen.next([{ id: "repo" }]).value).toMatchObject({
      PUT: { action: { payload: [{ id: "repo" }], type: SUCCESS_USER_REPOS } }
    });
  });
  it("returns error", () => {
    const gen = loadRepos({ payload: "user" });
    gen.next();
    gen.next();
    expect(gen.throw("error").value).toMatchObject({
      PUT: { action: { error: "error", type: FAILED_REPOS } }
    });
  });
});

describe("load contributions", () => {
  it("calculates contributions", () => {
    const gen = loadContributions();

    gen.next(SUCCESS_USER_DATA);
    gen.next(SUCCESS_USER_REPOS);
    gen.next("token");
    gen.next([{ id: "repo" }]);
    gen.next({ login: "user" });

    expect(
      gen.next([{ contributions: 10, login: "user" }]).value
    ).toMatchObject({
      PUT: { action: { payload: 10, type: LOAD_TOTAL_CONTRIBUTIONS } }
    });
  });
});

describe("load languages", () => {
  it("calculates language utilization", () => {
    const gen = loadLanguages();

    gen.next(SUCCESS_USER_REPOS);
    gen.next(SUCCESS_USER_DATA);
    gen.next("token");
    gen.next([{ id: "repo", owner: { login: "user" } }]);
    gen.next({ login: "user" });

    expect(
      gen.next([
        { javascript: 100001, python: 100002 },
        { javascript: 1, python: 2 }
      ]).value
    ).toMatchObject({
      PUT: {
        action: {
          payload: [
            { lang: "python", bytes: 100004 },
            { lang: "javascript", bytes: 100002 }
          ],
          type: LOAD_LANGUAGES
        }
      }
    });
  });
});

describe("github saga", () => {
  const gen = gitHubSaga();
  it("matches step", () => {
    gen.next(FETCH_USER_DATA);
    expect(gen.next(FETCH_USER_REPOS).done).toEqual(true);
  });
});

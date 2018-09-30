import reducer, {
  FETCH_USER_DATA,
  SUCCESS_USER_DATA,
  FETCH_USER_REPOS,
  SUCCESS_USER_REPOS,
  FAILED_REPOS,
  FAILED_USER_DATA,
  LOAD_TOTAL_CONTRIBUTIONS,
  LOAD_LANGUAGES,
  fetchUserData,
  fetchUserRepos,
  selectState,
  selectRepos,
  selectUser
} from "../";

describe("actions", () => {
  it("returns fetch user data action", () => {
    const user = "user";
    expect(fetchUserData(user)).toEqual({
      type: FETCH_USER_DATA,
      payload: user
    });
  });
  it("returns fetch repo action", () => {
    const user = "user";
    expect(fetchUserRepos(user)).toEqual({
      type: FETCH_USER_REPOS,
      payload: user
    });
  });
});

describe("selectors", () => {
  const repo = { id: "repo" };
  const user = { id: "user" };
  const github = {
    repos: [repo],
    user,
    commits: 0,
    languages: [],
    loadingRepos: false,
    loadingUser: false,
    expiry: ""
  };
  const state = {
    github,
    other: {}
  };

  it("selects from the state", () => {
    expect(selectState(state)).toEqual(github);
  });
  it("selects user from github", () => {
    expect(selectUser(state)).toEqual(user);
  });
  it("selects repo from github", () => {
    expect(selectRepos(state)).toEqual([repo]);
  });
});

describe("reducer", () => {
  const repo = { id: "repo" };
  const user = { id: "user" };
  const github = {
    repos: [repo],
    user,
    commits: 0,
    languages: [],
    loadingRepos: false,
    loadingUser: false,
    expiry: ""
  };

  it("sets loading user", () => {
    expect(reducer(github, fetchUserData("user"))).toHaveProperty(
      "loadingUser",
      true
    );
  });
  it("sets loading user", () => {
    expect(reducer(github, fetchUserRepos("user"))).toHaveProperty(
      "loadingRepos",
      true
    );
  });
  it("sets user information", () => {
    const action = {
      type: SUCCESS_USER_DATA,
      payload: user
    };
    expect(reducer(github, action)).toMatchObject({
      user,
      loadingUser: false
    });
  });
  it("sets repos information", () => {
    const action = {
      type: SUCCESS_USER_REPOS,
      payload: [repo],
      expiry: "some date"
    };
    expect(reducer(github, action)).toMatchObject({
      repos: [repo],
      loadingRepos: false,
      expiry: "some date"
    });
  });
  it("loads total contributions", () => {
    const action = {
      type: LOAD_TOTAL_CONTRIBUTIONS,
      payload: 10
    };
    expect(reducer(github, action)).toMatchObject({
      commits: 10
    });
  });
  it("loads languages", () => {
    const languages = {
      javascript: 100,
      python: 100
    };
    const action = {
      type: LOAD_LANGUAGES,
      payload: languages
    };
    expect(reducer(github, action)).toMatchObject({
      languages
    });
  });
  it("defaults to GitHub", () => {
    const action = {
      type: "some"
    };
    expect(reducer(github, action)).toEqual(github);
  });
  it("defaults to GitHub initial state", () => {
    const action = {
      type: "some"
    };
    const initialState = {
      repos: [],
      user: {},
      commits: 0,
      languages: [],
      topics: [],
      loadingRepos: false,
      loadingUser: false,
      expiry: ""
    };
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});

import rootReducer from "../";

describe("rootReducer", () => {
  const expectedState = {
    auth: { failed: false, token: "" },
    github: {
      commits: 0,
      expiry: "",
      languages: [],
      loadingRepos: false,
      loadingUser: false,
      topics: [],
      repos: [],
      user: {}
    },
    gist: { expiry: "", gist: "" },
    medium: {
      feed: {
        articles: {},
        user: {}
      },
      loadingFeed: false,
      loadingPost: false,
      post: []
    }
  };

  const state = rootReducer(undefined, undefined);

  it("contains all the reducers", () => {
    expect(state).toEqual(expectedState);
  });
});

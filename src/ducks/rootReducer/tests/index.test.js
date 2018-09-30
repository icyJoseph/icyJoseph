import rootReducer from "../";
import { OPEN } from "../../drawer";

describe("rootReducer", () => {
  const expectedState = {
    auth: { failed: false, token: "" },
    drawer: { id: undefined, open: true },
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

  const action = {
    type: OPEN
  };

  const state = rootReducer(undefined, action);

  it("contains all the reducers", () => {
    expect(state).toEqual(expectedState);
  });
});

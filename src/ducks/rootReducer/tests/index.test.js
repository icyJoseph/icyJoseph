import rootReducer from "../";
import { OPEN } from "../../drawer";

describe("rootReducer", () => {
  const expectedState = {
    drawer: { Content: undefined, open: true },
    github: {
      commits: 0,
      expiry: "",
      languages: [],
      loadingRepos: false,
      loadingUser: false,
      repos: [],
      user: {}
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

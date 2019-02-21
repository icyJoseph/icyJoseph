import { createStore } from "redux";
import saveStore, {
  saveState,
  getStateAndSave
} from "../saveStateToLocalStorage";

import { OPEN } from "../../ducks/drawer";

import rootReducer from "../../../src/ducks/rootReducer/";

describe("localStorage mock", () => {
  it("reads from empty local storage", () => {
    expect(localStorage.getItem("test")).toEqual(null);
  });

  it("writes to local storage", () => {
    const test = { test: "hi" };
    localStorage.setItem("test", JSON.stringify(test));
    expect(JSON.parse(localStorage.getItem("test"))).toEqual(test);
  });
});

describe("saveState", () => {
  afterAll(() => {
    localStorage.removeItem("icyJoseph");
  });
  const stateToSave = {
    counter: 1
  };

  it("saves to the localStorage", () => {
    saveState(stateToSave);
    const savedState = JSON.parse(localStorage.getItem("icyJoseph"));
    expect(savedState).toEqual(stateToSave);
  });
});

describe("getStateAndSave", () => {
  afterAll(() => {
    localStorage.removeItem("icyJoseph");
  });

  const state = { counter: 0 };

  const store = { subscribe: jest.fn(), getState: jest.fn(() => state) };

  it("saves the given state as a side effect", () => {
    getStateAndSave(store)();
    const savedState = JSON.parse(localStorage.getItem("icyJoseph"));
    expect(savedState).toEqual(state);
  });
});

describe("saveStore", () => {
  afterAll(() => {
    localStorage.removeItem("icyJoseph");
  });

  const state = {
    auth: { failed: false, token: "" },
    drawer: { id: null, open: false },
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

  const expectedState = {
    auth: { failed: false, token: "" },
    drawer: { id: null, open: true },
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
  const store = saveStore()(createStore)(rootReducer, state);

  it("returns the store with the given state", () => {
    expect(store.getState()).toEqual(state);
  });
  it("saves the state when the state changes", () => {
    store.dispatch({ type: OPEN, payload: null });
    const savedState = JSON.parse(localStorage.getItem("icyJoseph"));
    expect(savedState).toEqual(expectedState);
  });
});

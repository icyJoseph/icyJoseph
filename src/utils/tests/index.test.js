import { createStore } from "redux";
import saveStore, {
  saveState,
  getStateAndSave
} from "../saveStateToLocalStorage";

import rootReducer from "../../../src/ducks/reducers/";

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
  const stateToSave = {
    counter: 1
  };

  it("saves to the localStorage", () => {
    saveState(stateToSave);
    const savedState = JSON.parse(localStorage.getItem("state"));
    expect(savedState).toEqual(stateToSave);
  });
});

describe("getStateAndSave", () => {
  const state = {
    counter: 1
  };

  const store = { subscribe: jest.fn(), getState: jest.fn(() => state) };

  it("saves the given state as a side effect", () => {
    getStateAndSave(store);
    const savedState = JSON.parse(localStorage.getItem("state"));
    expect(savedState).toEqual(state);
  });
});

describe("saveStore", () => {
  const state = {
    counter: 1
  };

  const store = saveStore()(createStore)(rootReducer, state);

  it("returns the store with the given state", () => {
    expect(store.getState()).toEqual(state);
  });

  it("saves the given state as a side effect", () => {
    const savedState = JSON.parse(localStorage.getItem("state"));
    expect(savedState).toEqual(state);
  });
});

import counter, { INC } from "../counter";
import rootReducer from "../";

describe("counter", () => {
  const action = {
    type: INC
  };

  const result = 1;

  it("increments the default state", () => {
    expect(counter(undefined, action)).toEqual(result);
  });
});

describe("rootReducer", () => {
  const expectedState = {
    counter: 1
  };

  const action = {
    type: INC
  };

  const state = rootReducer(undefined, action);

  it("contains all the reducers", () => {
    expect(state).toEqual(expectedState);
  });
});

import rootReducer from "../";
import { INC } from "../../constants/counter";

describe("rootReducer", () => {
  const expectedState = {
    counter: 1,
    sideContainer: { Content: null, open: false }
  };

  const action = {
    type: INC
  };

  const state = rootReducer(undefined, action);

  it("contains all the reducers", () => {
    expect(state).toEqual(expectedState);
  });
});

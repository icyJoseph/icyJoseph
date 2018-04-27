import counter, { INC } from "../counter";

describe("counter", () => {
  const action = {
    type: INC
  };

  const expectedState = {
    counter: 1
  };

  it("increments the default state", () => {
    expect(counter(undefined, action)).toEqual(expectedState);
  });
});

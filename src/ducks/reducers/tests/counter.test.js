import counter from "../counter";
import { INC } from "../../constants/counter";

describe("counter", () => {
  const action = {
    type: INC
  };

  const result = 1;

  it("increments the default state", () => {
    expect(counter(undefined, action)).toEqual(result);
  });
});

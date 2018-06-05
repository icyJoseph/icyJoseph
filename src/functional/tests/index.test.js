import { take } from "../";

describe("take", () => {
  const target = [1, 2, 3, 4, 5];
  it("takes 4 elements from an array with 5 elements", () => {
    expect(take(4)(target)).toEqual([1, 2, 3, 4]);
  });
  it("handles out of bounds", () => {
    expect(take(6)(target)).toEqual(target);
  });
});

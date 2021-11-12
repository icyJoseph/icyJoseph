import {
  pipe,
  curry,
  curryRight,
  take,
  head,
  last,
  purify,
  split,
  capitalize
} from "functional";

describe("take", () => {
  const target = [1, 2, 3, 4, 5];
  it("takes 4 elements from an array with 5 elements", () => {
    expect(take(4)(target)).toEqual([1, 2, 3, 4]);
  });
  it("handles out of bounds", () => {
    expect(take(6)(target)).toEqual(target);
  });
  it("takes a starting point", () => {
    expect(take(2, 2)(target)).toEqual([3, 4]);
  });
});

describe("pipe", () => {
  const add = (a: number, b: number) => a + b;
  const mult = (a: number) => a * 3;
  it("pipes through the functions", () => {
    expect(pipe(add, mult)(2, 3)).toEqual(15);
  });
});

describe("curry", () => {
  const add = (a: number, b: number) => a + b;
  const mult = (a: number, b: number) => a * b;
  const curriedAdd = curry(add);
  const curriedMult = curry(mult);

  it("curries the functions", () => {
    expect(curriedAdd).toBeInstanceOf(Function);
    expect(curriedMult).toBeInstanceOf(Function);
  });

  it("allows to pass arguments separately", () => {
    expect(curriedAdd(2)(3)).toEqual(5);
    expect(curriedMult(2)(3)).toEqual(6);
  });
});

describe("curryRight", () => {
  const add = (a: number, b: number) => a + b;
  const mult = (a: number, b: number) => a * b;

  const curriedAdd = curryRight(add);
  const curriedMult = curryRight(mult);

  it("curries the functions from the Right", () => {
    expect(curriedAdd).toBeInstanceOf(Function);
    expect(curriedMult).toBeInstanceOf(Function);
  });

  it("allows to pass arguments separately", () => {
    expect(curriedAdd(2)(3)).toEqual(5);
    expect(curriedMult(2)(3)).toEqual(6);
  });
});

describe("head", () => {
  const values = [1, 2, 3, 4];
  it("takes the head (first element)", () => {
    expect(head(values)).toEqual(1);
  });
});

describe("last", () => {
  const values = [1, 2, 3, 4];
  it("takes the last element", () => {
    expect(last(values)).toEqual(4);
  });
});

describe("purify", () => {
  const arr = [1, 2, undefined, null];
  it("removes `null` and `undefined` from an array", () => {
    expect(purify(arr)).toEqual([1, 2]);
  });
});

describe("split", () => {
  const str = "react.redux.app";
  const pattern = ".";
  it("splits at the pattern", () => {
    expect(split(str, pattern)).toEqual(["react", "redux", "app"]);
  });
});

describe("capitalize", () => {
  const str = "react";
  it("capitalizes the string", () => {
    expect(capitalize(str)).toEqual("React");
  });
});

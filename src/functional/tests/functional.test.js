import {
  pipe,
  curry,
  curryRight,
  flatten,
  sort,
  mapf,
  filterf,
  take,
  head,
  last,
  keys,
  values,
  get,
  purify,
  split,
  capitalize,
  len,
  getByFileName
} from "../";

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
  const add = (a, b) => a + b;
  const mult = (a) => a * 3;
  it("pipes through the functions", () => {
    expect(pipe(add, mult)(2, 3)).toEqual(15);
  });
});

describe("curry", () => {
  const add = (a, b) => a + b;
  const mult = (a, b) => a * b;
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
  const add = (a, b) => a + b;
  const mult = (a, b) => a * b;
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

describe("flatten", () => {
  const unflatten = [[1, 2], [3], [4, 5]];
  it("flattens the array", () => {
    expect(flatten(unflatten)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("sort", () => {
  // Descending sort
  const unsorted = [{ a: 1 }, { a: 3 }, { a: 2 }];
  it("sorts according to specified key", () => {
    expect(sort("a", unsorted)).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }]);
  });
});

describe("mapf", () => {
  const values = [1, 2, 3, 4];
  const f = (a) => a + 1;
  it("maps a function over some values", () => {
    expect(mapf(f, values)).toEqual([2, 3, 4, 5]);
  });
});

describe("filterf", () => {
  const values = [1, 2, 3, 4];
  const f = (a) => a > 2;
  it("filters using a function over some values", () => {
    expect(filterf(f, values)).toEqual([3, 4]);
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

describe("keys", () => {
  const obj = { a: 1, b: 2, c: 3 };
  it("takes the keys of the object", () => {
    expect(keys(obj)).toEqual(["a", "b", "c"]);
  });
});

describe("values", () => {
  const obj = { a: 1, b: 2, c: 3 };
  it("takes the keys of the object", () => {
    expect(values(obj)).toEqual([1, 2, 3]);
  });
});

describe("getByFileName", () => {
  const obj = { "file.js": 1 };
  it("takes key of the object", () => {
    expect(getByFileName(obj, "file.js")).toEqual(1);
  });
  it("fail safes undefined object", () => {
    expect(getByFileName(undefined, "a")).toEqual(null);
  });
});

describe("get", () => {
  const obj = { a: 1, b: 2, c: 3 };
  it("takes key of the object", () => {
    expect(get(obj, "a")).toEqual(1);
  });
  it("takes key in a nested object", () => {
    const nested = { a: { b: 2, c: 3 } };
    expect(get(nested, "a.b")).toEqual(2);
    expect(get(nested, "a.d")).toEqual(null);
  });
  it("fail safes undefined object", () => {
    expect(get(undefined, "a")).toEqual(null);
  });
  it("returns for a key with dots", () => {
    expect(get({ "a.b.c": 1 }, "a.b.c")).toEqual(1);
  });
});

describe("purify", () => {
  const arr = [1, 2, false, null];
  it("removes falsy from an array", () => {
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

describe("len", () => {
  const arr = [1, 2, 3];
  it("gets the length of an array", () => {
    expect(len(arr)).toEqual(3);
  });
  it("gets length safely for undefined", () => {
    expect(len(undefined)).toEqual(0);
  });
  it("gets length safely for null", () => {
    expect(len(null)).toEqual(0);
  });
});

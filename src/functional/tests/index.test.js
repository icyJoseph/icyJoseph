import {
  pipe,
  curry,
  mapValueToFunctions,
  flatten,
  sort,
  mapf,
  filterf,
  take
} from "../";

describe("take", () => {
  const target = [1, 2, 3, 4, 5];
  it("takes 4 elements from an array with 5 elements", () => {
    expect(take(4)(target)).toEqual([1, 2, 3, 4]);
  });
  it("handles out of bounds", () => {
    expect(take(6)(target)).toEqual(target);
  });
});

describe("pipe", () => {
  const add = (a, b) => a + b;
  const mult = a => a * 3;
  it("pipes through the functions", () => {
    expect(
      pipe(
        add,
        mult
      )(2, 3)
    ).toEqual(15);
  });
});

describe("pipe", () => {
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

describe("mapValueToFunctions", () => {
  const add = (a, b) => a + b;
  const mult = (a, b) => a * b;
  it("maps the values", () => {
    expect(mapValueToFunctions(add, mult)(2, 3)).toEqual([5, 6]);
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
  const f = a => a + 1;
  it("maps a function over some values", () => {
    expect(mapf(f, values)).toEqual([2, 3, 4, 5]);
  });
});

describe("filterf", () => {
  const values = [1, 2, 3, 4];
  const f = a => a > 2;
  it("filters using a function over some values", () => {
    expect(filterf(f, values)).toEqual([3, 4]);
  });
});

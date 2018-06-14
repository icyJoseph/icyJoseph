import { shouldFetch } from "../helpers";

describe("shouldFetch", () => {
  const expiry = "2018-06-11T04:49:03.603Z";
  const veryLateDate = "9999-06-11T04:49:03.603Z";

  it("evaluates if now > expiry", () => {
    expect(shouldFetch(expiry)).toEqual(true);
  });
  it("evaluates true if expiry is undefined", () => {
    expect(shouldFetch(undefined)).toEqual(true);
  });
  it("evaluates expiry < now", () => {
    expect(shouldFetch(veryLateDate)).toEqual(false);
  });
});

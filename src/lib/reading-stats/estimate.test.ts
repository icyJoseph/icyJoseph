/**
 * @jest-environment node
 */

import { estimateReadingTime } from "./estimate";

describe("estimate reading time", () => {
  it("a simple sentence", async () => {
    const result = await estimateReadingTime("Hello World");

    expect(result.time).toBeCloseTo(600);

    expect(result.words).toEqual(2);

    expect(result.minutes).toEqual(1);
  });

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  it("single lorem ipsum", async () => {
    const result = await estimateReadingTime(lorem);

    expect(result.time).toBeCloseTo(20700);

    expect(result.words).toEqual(69);

    expect(result.minutes).toEqual(1);
  });

  it("multiple lorem ipsum", async () => {
    const result = await estimateReadingTime(`${lorem}\n${lorem}\n${lorem}`);

    expect(result.time).toBeCloseTo(20700 * 3);

    expect(result.words).toEqual(69 * 3);

    expect(result.minutes).toEqual(2);
  });
});

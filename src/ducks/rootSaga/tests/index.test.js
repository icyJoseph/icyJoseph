import rootSaga from "../";

describe("rootSaga", () => {
  const gen = rootSaga().next();
  it("returns a generator with gitHubSaga", () => {
    expect(gen.value).toMatchSnapshot();
  });
});

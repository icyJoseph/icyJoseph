import reducer, {
  openDrawer,
  closeDrawer,
  changeContent,
  OPEN,
  CLOSE,
  CHANGE_CONTENT
} from "../";

describe("openDrawer", () => {
  const expectedAction = {
    type: OPEN,
    payload: "hi"
  };

  it("returns the expected action", () => {
    const action = openDrawer("hi");
    expect(action).toEqual(expectedAction);
  });
});

describe("closeDrawer", () => {
  const expectedAction = {
    type: CLOSE
  };

  it("returns the expected action", () => {
    const action = closeDrawer();
    expect(action).toEqual(expectedAction);
  });
});

describe("changeDrawerContent", () => {
  const expectedAction = {
    type: CHANGE_CONTENT,
    payload: "hi2"
  };

  it("returns the expected action", () => {
    const action = changeContent("hi2");
    expect(action).toEqual(expectedAction);
  });
});

describe("open drawer", () => {
  const action = {
    type: OPEN,
    payload: "hi"
  };

  const result = { open: true, id: "hi" };

  it("opens the side container with id", () => {
    expect(reducer(undefined, action)).toEqual(result);
  });
});

describe("close drawer", () => {
  const action = {
    type: CLOSE
  };

  const initialState = { open: true, id: "hi" };
  const result = { open: false, id: "hi" };

  it("closes the side container", () => {
    expect(reducer(initialState, action)).toEqual(result);
  });
});

describe("change drawer id", () => {
  const action = {
    type: CHANGE_CONTENT,
    payload: "bye"
  };

  const initialState = { open: true, id: "hi" };
  const result = { open: true, id: "bye" };

  it("change the id keeping drawer open", () => {
    expect(reducer(initialState, action)).toEqual(result);
  });
});

import sideContainer from "../sideContainer";
import { OPEN, CLOSE, CHANGE_CONTENT } from "../../constants/sideContainer";

describe("open sideContainer", () => {
  const action = {
    type: OPEN,
    payload: "hi"
  };

  const result = { open: true, Content: "hi" };

  it("opens the side container with Content", () => {
    expect(sideContainer(undefined, action)).toEqual(result);
  });
});

describe("close sideContainer", () => {
  const action = {
    type: CLOSE
  };

  const initialState = { open: true, Content: "hi" };
  const result = { open: false, Content: "hi" };

  it("closes the side container", () => {
    expect(sideContainer(initialState, action)).toEqual(result);
  });
});

describe("change sideContainer content", () => {
  const action = {
    type: CHANGE_CONTENT,
    payload: "bye"
  };

  const initialState = { open: true, Content: "hi" };
  const result = { open: true, Content: "bye" };

  it("change the Content keeping sideContainer open", () => {
    expect(sideContainer(initialState, action)).toEqual(result);
  });
});

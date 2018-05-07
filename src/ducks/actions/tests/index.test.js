import {
  openSideContent,
  closeSideContent,
  changeContent
} from "../sideContainer";
import { OPEN, CLOSE, CHANGE_CONTENT } from "../../constants/sideContainer";

describe("openSideContent", () => {
  const expectedAction = {
    type: OPEN,
    payload: "hi"
  };

  it("returns the expected action", () => {
    const action = openSideContent("hi");
    expect(action).toEqual(expectedAction);
  });
});

describe("closeSideContent", () => {
  const expectedAction = {
    type: CLOSE
  };

  it("returns the expected action", () => {
    const action = closeSideContent();
    expect(action).toEqual(expectedAction);
  });
});

describe("changeSideContent", () => {
  const expectedAction = {
    type: CHANGE_CONTENT,
    payload: "hi2"
  };

  it("returns the expected action", () => {
    const action = changeContent("hi2");
    expect(action).toEqual(expectedAction);
  });
});

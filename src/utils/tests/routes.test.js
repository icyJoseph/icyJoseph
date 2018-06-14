import React from "react";
import { shallow } from "enzyme";
import Routes, {
  AsyncHome,
  AsyncApp,
  AsyncNoMatch,
  AsyncTopMenu,
  AsyncBottomMenu
} from "../../routes";

describe("SnapShot Routes", () => {
  const wrapper = shallow(<Routes />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("AsyncHome", () => {
  const loaded = shallow(<AsyncHome />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncHome", () => {
  const loaded = shallow(<AsyncApp />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncHome", () => {
  const loaded = shallow(<AsyncNoMatch />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncHome", () => {
  const loaded = shallow(<AsyncTopMenu />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncHome", () => {
  const loaded = shallow(<AsyncBottomMenu />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

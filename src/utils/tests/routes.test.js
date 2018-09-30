import React from "react";
import { shallow } from "enzyme";
import Routes, {
  AsyncLanding,
  AsyncHacks,
  AsyncBlog,
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

describe("AsyncLanding", () => {
  const loaded = shallow(<AsyncLanding />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncHacks", () => {
  const loaded = shallow(<AsyncHacks />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncBlog", () => {
  const loaded = shallow(<AsyncBlog />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncNoMatch", () => {
  const loaded = shallow(<AsyncNoMatch />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncTopMenu", () => {
  const loaded = shallow(<AsyncTopMenu />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncBottomMenu", () => {
  const loaded = shallow(<AsyncBottomMenu />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

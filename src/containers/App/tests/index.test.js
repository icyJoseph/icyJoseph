import React from "react";
import { shallow } from "enzyme";
import { App } from "../";

describe("App", () => {
  const props = {
    match: { path: "/" }
  };
  const wrapper = shallow(<App {...props} />);
  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { NoMatch } from "../";

describe("404 Page", () => {
  const wrapper = shallow(<NoMatch />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

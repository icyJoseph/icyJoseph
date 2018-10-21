import React from "react";
import { shallow } from "enzyme";
import MainTitle from "../";

describe("MainTitle", () => {
  const props = { title: "Test Title" };
  const wrapper = shallow(<MainTitle {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

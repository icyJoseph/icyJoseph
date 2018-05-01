import React from "react";
import { shallow } from "enzyme";
import Mobile from "../";

describe("Mobile View", () => {
  const wrapper = shallow(<Mobile />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

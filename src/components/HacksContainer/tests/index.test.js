import React from "react";
import { shallow } from "enzyme";
import { Drawer } from "../";

describe("Drawer", () => {
  const props = {
    visibility: true,
    Content: jest.fn(),
    close: jest.fn()
  };
  const wrapper = shallow(<Drawer {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

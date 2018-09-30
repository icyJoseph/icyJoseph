import React from "react";
import { shallow } from "enzyme";
import { Hacks } from "../";
import data from "../../../data";

describe("HomeDesktopGrid", () => {
  const closeDrawer = jest.fn();
  const openDrawer = jest.fn();
  const props = {
    visibility: false,
    contentId: 1,
    closeDrawer,
    openDrawer,
    data
  };
  const wrapper = shallow(<Hacks {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

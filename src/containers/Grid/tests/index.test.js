import React from "react";
import { shallow } from "enzyme";
import { HomeDesktopGrid } from "../";
import data from "../../../data";

describe("HomeDesktopGrid", () => {
  const closeDrawer = jest.fn();
  const openDrawer = jest.fn();
  const props = {
    visibility: false,
    Content: null,
    closeDrawer,
    openDrawer,
    data
  };
  const wrapper = shallow(<HomeDesktopGrid {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

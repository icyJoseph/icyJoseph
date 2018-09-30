import React from "react";
import { shallow } from "enzyme";
import { TabletWrapper } from "../";

describe("TabletWrapper", () => {
  const wrapper = shallow(<TabletWrapper />);
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import Routes from "../../routes";
import { shallow } from "enzyme";

describe("SnapShot Routes", () => {
  const wrapper = shallow(<Routes />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

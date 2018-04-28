import React from "react";
import { shallow } from "enzyme";

import { TopMenu } from "../";
import { Menu } from "semantic-ui-react";

describe("TopMenu", () => {
  const props = {
    history: { push: jest.fn() }
  };
  const spy = jest.spyOn(TopMenu.prototype, "handleClick");
  const wrapper = shallow(<TopMenu {...props} />);

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has three children", () => {
    expect(wrapper.find(Menu.Item)).toHaveLength(3);
  });

  it("click handler pushes to history object", () => {
    wrapper.instance().handleClick(undefined, { name: "blog" });
    expect(spy).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith("/blog");
  });

  it("click handler pushes to history object when clicking home", () => {
    wrapper.instance().handleClick(undefined, { name: "home" });
    expect(spy).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith("/");
  });
});

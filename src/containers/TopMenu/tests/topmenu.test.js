import React from "react";
import { shallow } from "enzyme";
import { TopMenu, mapStateToProps } from "..";
import Brand from "../../../components/Brand";
import { NavBar, NavItems, NavItem } from "../../../components/Nav";

describe("TopMenu", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { activeItem: undefined } },
    repos: ["test-repo"],
    links: { "test-repo": "homepage" }
  };

  const addSpy = jest.fn();
  const removeSpy = jest.fn();

  window.addEventListener = addSpy;
  window.removeEventListener = removeSpy;

  const spy = jest.spyOn(TopMenu.prototype, "handleClick");
  const wrapper = shallow(<TopMenu {...props} />, {
    disableLifecycleMethods: false
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
    expect(React.isValidElement(<TopMenu {...props} />)).toEqual(true);
    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  it("has a Brand component", () => {
    expect(wrapper.find(Brand)).toHaveLength(1);
  });

  it("has three NavItems", () => {
    expect(wrapper.find(NavItems).children()).toHaveLength(3);
    expect(wrapper.dive().find(NavItem)).toHaveLength(3);
  });

  it("navigates when clicking the items", () => {
    wrapper
      .dive()
      .find(NavItem)
      .at(0)
      .dive()
      .find("button")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalled();
    // not to be called because we are already at home
    expect(props.history.push).not.toHaveBeenCalledWith("/");
    wrapper
      .dive()
      .find(NavItem)
      .at(1)
      .dive()
      .find("button")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalled();
    // to be called because we are want to go to blog
    expect(props.history.push).toHaveBeenCalledWith("/blog");
  });

  it("click handler pushes to history object", () => {
    wrapper.instance().handleClick(undefined, "blog");
    expect(spy).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith("/blog");
  });

  it("click handler pushes to history object when clicking home", () => {
    wrapper.instance().handleClick(undefined, "");
    expect(spy).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith("/");
  });

  it("removesListener", () => {
    wrapper.instance().componentWillUnmount();
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});

describe("mapStateToProps", () => {
  const repos = [
    { name: "test0", html_url: "url0" },
    { name: "test1", html_url: "url1" }
  ];
  const state = {
    github: { repos }
  };
  it("maps the data to a desirable shape", () => {
    expect(mapStateToProps(state)).toEqual({
      repos: ["test0", "test1"],
      links: { test0: "url0", test1: "url1" }
    });
  });
});

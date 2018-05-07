import React from "react";
import { shallow } from "enzyme";
import ReactLogo from "../ReactLogo";
import PythonLogo from "../PythonLogo";
import JavaScriptLogo from "../JavaScriptLogo";

describe("ReactLogo", () => {
  const spy = jest.fn();
  const wrapper = shallow(<ReactLogo handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onClick calls the handler", () => {
    wrapper.find("g").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("PythonLogo", () => {
  const spy = jest.fn();
  const wrapper = shallow(<PythonLogo handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onClick calls the handler", () => {
    wrapper.simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("JavaScriptLogo", () => {
  const spy = jest.fn();
  const wrapper = shallow(<JavaScriptLogo handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onClick calls the handler", () => {
    wrapper.find("g").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

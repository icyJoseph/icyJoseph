import React from "react";
import { shallow } from "enzyme";
import Award from "../Award";
import BrainStorm from "../BrainStorm";
import Broken from "../Broken";
import Experience from "../Experience";
import Github from "../Github";
import Loading from "../Loading";
import Report from "../Report";

describe("Award", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Award handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Award onClick calls the handler", () => {
    wrapper
      .find("g")
      .at(0)
      .simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("BrainStorm", () => {
  const spy = jest.fn();
  const wrapper = shallow(<BrainStorm handler={spy} />);
  it("BrainStorm renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onClick calls the handler", () => {
    wrapper
      .find("g")
      .at(0)
      .simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("Broken", () => {
  const wrapper = shallow(<Broken />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Experience", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Experience handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Experience onClick calls the handler", () => {
    wrapper
      .find("g")
      .at(0)
      .simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("Github", () => {
  const wrapper = shallow(<Github width={100} height={100} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Loading", () => {
  const wrapper = shallow(<Loading />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Report", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Report handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Report onClick calls the handler", () => {
    wrapper
      .find("g")
      .at(0)
      .simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

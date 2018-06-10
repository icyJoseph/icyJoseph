import React from "react";
import { shallow } from "enzyme";
import Award from "../Award";
import BrainStorm from "../BrainStorm";
import Broken from "../Broken";
import Experience from "../Experience";
import Github from "../Github";
import JavaScriptLogo from "../JavaScriptLogo";
import Loading from "../Loading";
import Me from "../Me";
import Problem from "../Problem";
import PythonLogo from "../PythonLogo";
import ReactLogo from "../ReactLogo";
import Redux from "../Redux";
import Report from "../Report";
import Rocket from "../Rocket";

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

describe("Me", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Me handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Me onClick calls the handler", () => {
    wrapper.find("g").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("Loading", () => {
  const wrapper = shallow(<Loading />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Problem", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Problem handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Problem onClick calls the handler", () => {
    wrapper.find("g").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

describe("Redux", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Redux handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Redux onClick calls the handler", () => {
    wrapper.find("g").simulate("click");
    expect(spy).toHaveBeenCalled();
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

describe("Rocket", () => {
  const spy = jest.fn();
  const wrapper = shallow(<Rocket handler={spy} />);
  it("renders without fill prop", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Rocket onClick calls the handler", () => {
    wrapper.find("g").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});

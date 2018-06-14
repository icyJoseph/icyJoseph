import React from "react";
import { shallow } from "enzyme";
import { HeaderLoader } from "../HeaderLoader";
import { BodyLoader } from "../BodyLoader";
import { BottomLoader } from "../BottomLoader";
import { Spinner } from "../Spinner";

describe("HeaderLoader", () => {
  it("pastDelay", () => {
    const props = {
      pastDelay: true,
      error: null
    };
    const wrapper = HeaderLoader(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: true,
      error: "404"
    };
    const wrapper = HeaderLoader(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: false,
      error: null
    };
    const wrapper = HeaderLoader(props);
    expect(wrapper).toBe(null);
  });
});

describe("BodyLoader", () => {
  it("pastDelay", () => {
    const props = {
      pastDelay: true,
      error: null
    };
    const wrapper = BodyLoader(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: true,
      error: "404"
    };
    const wrapper = BodyLoader(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: false,
      error: null
    };
    const wrapper = BodyLoader(props);
    expect(wrapper).toBe(null);
  });
});

describe("BottomLoader", () => {
  it("pastDelay", () => {
    const props = {
      pastDelay: true,
      error: null
    };
    const wrapper = BottomLoader(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: true,
      error: "404"
    };
    const wrapper = BottomLoader(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: false,
      error: null
    };
    const wrapper = BottomLoader(props);
    expect(wrapper).toBe(null);
  });
});

describe("Spinner", () => {
  it("pastDelay", () => {
    const props = {
      pastDelay: true,
      error: null
    };
    const wrapper = shallow(<Spinner {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: true,
      error: "404"
    };
    const wrapper = shallow(<Spinner {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("error", () => {
    const props = {
      pastDelay: false,
      error: null
    };
    const wrapper = shallow(<Spinner {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

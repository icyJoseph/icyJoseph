import React from "react";
import { shallow } from "enzyme";
import { Landing } from "../";
import timeLine from "../../../data/TimeLine";

describe("Landing desktop", () => {
  const props = {
    desktop: true,
    timeLine,
    github: {
      repos: [{ id: "repo", owner: { login: "user" } }],
      user: "user",
      commits: 10,
      languages: [{ lang: "js", bytes: 100000 }]
    }
  };
  const wrapper = shallow(<Landing {...props} />);

  it("renders", () => {
    expect(wrapper.exists()).toEqual(true);
  });
});

describe("Landing mobile", () => {
  const props = {
    desktop: false,
    timeLine,
    github: {
      repos: [{ id: "repo", owner: { login: "user" } }],
      user: "user",
      commits: 10,
      languages: [{ lang: "js", bytes: 100000 }]
    }
  };
  const wrapper = shallow(<Landing {...props} />);

  it("renders", () => {
    expect(wrapper.exists()).toEqual(true);
  });
});

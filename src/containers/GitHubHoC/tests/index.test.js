import React from "react";
import { shallow, mount } from "enzyme";
import withGitHub from "../";
import data from "../../../data";

describe.skip("Tablet", () => {
  const fetchUserData = jest.fn();
  const fetchUserRepos = jest.fn();
  const props = {
    data,
    github: {
      repos: [{ id: "repo", owner: { login: "user" } }],
      user: "user",
      commits: 10,
      languages: [{ lang: "js", bytes: 100000 }]
    },
    fetchUserData,
    fetchUserRepos
  };
  const mountSpy = jest.spyOn(Tablet.prototype, "componentDidMount");
  const wrapper = shallow(<Tablet {...props} />);

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("mounts and calls api's", () => {
    // if no expiry available, fetch and set one in the saga
    expect(mountSpy).toHaveBeenCalled();
    expect(fetchUserData).toHaveBeenCalled();
    expect(fetchUserRepos).toHaveBeenCalled();
  });
});

describe.skip("Cache Data", () => {
  const fetchUserData = jest.fn();
  const fetchUserRepos = jest.fn();
  const props = {
    data,
    github: {
      repos: [{ id: "repo", owner: { login: "user" } }],
      user: "user",
      commits: 10,
      languages: [{ lang: "js", bytes: 100000 }],
      expiry: "2018-06-11T04:49:03.603Z"
    },
    fetchUserData,
    fetchUserRepos
  };
  const mountSpy = jest.spyOn(Tablet.prototype, "componentDidMount");
  const wrapper = mount(<Tablet {...props} />);

  it("refetches on mount if now > expiry", () => {
    expect(mountSpy).toHaveBeenCalled();
    expect(fetchUserData).toHaveBeenCalled();
    expect(fetchUserRepos).toHaveBeenCalled();
  });

  describe("does not refetch on mount if now < expiry", () => {
    const fetchUserData = jest.fn();
    const fetchUserRepos = jest.fn();
    const props = {
      data,
      github: {
        repos: [{ id: "repo", owner: { login: "user" } }],
        user: "user",
        commits: 10,
        languages: [{ lang: "js", bytes: 100000 }],
        expiry: "9999-06-11T04:49:03.603Z"
      },
      fetchUserData,
      fetchUserRepos
    };
    const mountSpy = jest.spyOn(Tablet.prototype, "componentDidMount");
    const wrapper = mount(<Tablet {...props} />);
    it("does not dispatch to redux", () => {
      expect(mountSpy).toHaveBeenCalled();
      expect(fetchUserData).not.toHaveBeenCalled();
      expect(fetchUserRepos).not.toHaveBeenCalled();
    });
  });
});

describe.skip("Redux", () => {
  const state = {
    github: { user: "user" },
    other: { other: "other" }
  };
  it("returns github data", () => {
    expect(mapStateToProps(state)).toEqual({ github: { user: "user" } });
  });
});

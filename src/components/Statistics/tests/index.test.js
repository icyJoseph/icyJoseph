import React from "react";
import { shallow } from "enzyme";
import { Statistics } from "../";

describe("Statistics", () => {
  it("renders empty", () => {
    const emptyWrapper = shallow(<Statistics />);
    expect(emptyWrapper).toMatchSnapshot();
  });
  const props = {
    commits: 10,
    publicRepos: 10,
    languages: [{ lang: "javascript", bytes: 200000 }]
  };
  const wrapper = shallow(<Statistics {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

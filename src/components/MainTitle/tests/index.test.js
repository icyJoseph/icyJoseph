import React from "react";
import { shallow } from "enzyme";
import MainTitle from "../";

describe("MainTitle", () => {
  const props = { title: "Test Title" };
  const spy = jest.spyOn(MainTitle.prototype, "componentDidMount");
  const revealSpy = jest.spyOn(MainTitle.prototype, "revealTitle");
  const wrapper = shallow(<MainTitle {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();
  });

  it("changes state when revealSpy is called", () => {
    const initialState = wrapper.state(["reveal"]);
    wrapper.instance().revealTitle();
    expect(wrapper.state(["reveal"])).toEqual(!initialState);
  });
});

import React from "react";
import { shallow } from "enzyme";
import { CardWrapper, DescriptionWrapper } from "../styled";
import { Card } from "../Card";
import { Event } from "../Event";

describe("Event", () => {
  const props = {
    title: "title",
    meta: "meta",
    description: "description",
    last: false
  };

  const spyToggle = jest.spyOn(Event.prototype, "toggle");
  const wrapper = shallow(<Event {...props} />);
  const initialState = wrapper.state("height");

  it("toggles height on click to a Card Element", () => {
    wrapper
      .find(Card)
      .shallow()
      .find(CardWrapper)
      .simulate("click");

    const state = wrapper.state("height");
    expect(state).not.toEqual(initialState);
    expect(spyToggle).toHaveBeenCalled();
  });
  it("toggles height back to `1` on click to a Card Element", () => {
    wrapper
      .find(Card)
      .shallow()
      .find(CardWrapper)
      .simulate("click");

    const state = wrapper.state("height");
    expect(state).toEqual(initialState);
    expect(spyToggle).toHaveBeenCalled();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { BottomMenu } from "../";
import { Contact } from "../../Contact";
import { ModalWrapper } from "../../Contact/styled";

describe("BottomMenu", () => {
  const spyClickContact = jest.spyOn(
    BottomMenu.prototype,
    "handleClickContact"
  );
  const spyCloseContact = jest.spyOn(
    BottomMenu.prototype,
    "handleCloseContact"
  );

  const wrapper = shallow(<BottomMenu />);

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("sets active contact", () => {
    wrapper
      .find(Button)
      .at(2)
      .simulate("click");
    expect(wrapper.state("contact")).toEqual(true);
    expect(spyClickContact).toHaveBeenCalled();
  });

  it("closes contact", () => {
    expect(wrapper.find(Contact).prop("open")).toEqual(
      wrapper.state("contact")
    );

    wrapper
      .find(Contact)
      .dive()
      .find(Button)
      .simulate("click");

    expect(wrapper.state("contact")).toEqual(false);
    expect(spyCloseContact).toHaveBeenCalled();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { Menu, Button, Modal } from "semantic-ui-react";
import { BottomMenu } from "../";
import { Contact } from "../../Contact";
import { ModalWrapper } from "../../Contact/styled";

describe("BottomMenu", () => {
  const spyItemClick = jest.spyOn(BottomMenu.prototype, "handleItemClick");
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

  it("has no active item in the beginning", () => {
    expect(wrapper.state("activeItem")).toBe(undefined);
    expect(wrapper.state("contact")).toEqual(false);
  });

  it("sets active item", () => {
    wrapper
      .find(Menu.Item)
      .at(0)
      .simulate(
        "click",
        { event: { target: { value: "" } } },
        { name: "LinkedIn" }
      );
    expect(wrapper.state("activeItem")).toEqual("LinkedIn");
    expect(spyItemClick).toHaveBeenCalled();
  });

  it("sets active contact", () => {
    wrapper
      .find(Menu.Item)
      .at(2)
      .simulate(
        "click",
        { event: { target: { value: "" } } },
        { name: "Contact" }
      );
    expect(wrapper.state("activeItem")).toEqual("Contact");
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

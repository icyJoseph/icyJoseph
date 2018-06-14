import React from "react";
import { shallow } from "enzyme";
import { Button } from "semantic-ui-react";
import { Contact } from "../";

describe("Contact", () => {
  const handleClose = jest.fn();
  const props = {
    open: true,
    handleClose
  };
  const wrapper = shallow(<Contact {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("uses the handler", () => {
    wrapper.find(Button).simulate("click");
    expect(handleClose).toHaveBeenCalled();
  });
});

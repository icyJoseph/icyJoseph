import React from "react";
import { shallow } from "enzyme";
import { ModalWrapper } from "../";

describe("ModalWrapper", () => {
  const wrapper = shallow(<ModalWrapper />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

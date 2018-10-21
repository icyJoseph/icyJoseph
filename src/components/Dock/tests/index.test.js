import React from "react";
import { shallow } from "enzyme";
import { Dock } from "../";
import { DockIcon } from "../DockIcon";
import data from "../../../data";

describe("DockIcon", () => {
  const spy = jest.fn();
  const props = {
    tile: {
      ...data[0]
    },
    clickHandler: spy
  };

  const wrapper = shallow(<DockIcon {...props} />);

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("injects children with clickHandler", () => {
    const onClick = wrapper
      .children()
      .at(0)
      .prop(["handler"]);
    expect(onClick).toBeInstanceOf(Function);
    onClick();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Dock", () => {
  const items = data.filter(d => !d.hide);

  const props = {
    items,
    clickHandler: jest.fn()
  };

  const wrapper = shallow(<Dock {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders all items", () => {
    expect(wrapper.find(DockIcon)).toHaveLength(items.length);
  });
});

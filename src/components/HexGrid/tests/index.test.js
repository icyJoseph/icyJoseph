import React from "react";
import { shallow } from "enzyme";
import Hexagon from "react-hexagon";

import HexGridColumn from "../HexGridColumn";

describe("HexGridColumn", () => {
  const spy = jest.fn();
  const props = {
    tile: {
      Component: () => <div>Hi</div>,
      Content: <div>hi</div>,
      fill: "#222",
      backgroundFill: "#333"
    },
    clickHandler: spy
  };

  const wrapper = shallow(<HexGridColumn {...props} />);

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onClick, Hexagon uses clickHandler", () => {
    wrapper.find(Hexagon).simulate("click");
    expect(spy).toHaveBeenCalledWith(props.tile.Content);
  });

  it("injects clickHanlder with Content into Hexagon", () => {
    const onClick = wrapper.find(Hexagon).prop(["onClick"]);
    expect(onClick).toBeInstanceOf(Function);
    onClick();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

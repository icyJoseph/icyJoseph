import React from "react";
import { shallow } from "enzyme";
import Hexagon from "react-hexagon";
import { HexGrid } from "../";
import { HexGridRow } from "../HexGridRow";
import { HexGridColumn } from "../HexGridColumn";
import { take } from "../../../functional";
import data from "../../../data";

describe("HexGridColumn", () => {
  const spy = jest.fn();
  const props = {
    tile: {
      ...data[0]
    },
    clickHandler: spy
  };

  const wrapper = shallow(<HexGridColumn {...props} />);

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onClick, Hexagon uses clickHandler", () => {
    wrapper.find(Hexagon).simulate("click");
    expect(spy).toHaveBeenCalledWith(props.tile.id);
  });

  it("injects clickHanlder with Content into Hexagon", () => {
    const onClick = wrapper.find(Hexagon).prop(["onClick"]);
    expect(onClick).toBeInstanceOf(Function);
    onClick();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe("HexGridRow", () => {
  const row = take(3, 0)(data);
  const props = {
    row,
    clickHandler: jest.fn()
  };
  const wrapper = shallow(<HexGridRow {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders all columns", () => {
    expect(wrapper.find(HexGridColumn)).toHaveLength(row.length);
  });
});

describe("HexGrid", () => {
  const rows = [take(3, 0), take(4, 3), take(3, 7)].map(f => f(data));

  const props = {
    rows,
    clickHandler: jest.fn()
  };

  const wrapper = shallow(<HexGrid {...props} />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders all rows", () => {
    expect(wrapper.find(HexGridRow)).toHaveLength(rows.length);
  });
});

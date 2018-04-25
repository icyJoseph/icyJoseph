import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "../";

describe("App", () => {
  const wrapper = shallow(<App />);
  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

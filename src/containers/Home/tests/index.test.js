import React from "react";
import { shallow } from "enzyme";
import Media from "react-media";
import {
  Home,
  MediaRoutes,
  mapStateToProps,
  AsyncTablet,
  AsyncDesktop
} from "../";

import { Tablet } from "../../Tablet";
import { HomeDesktopGrid } from "../../HomeDesktopGrid";

describe("Home", () => {
  const wrapper = shallow(<Home />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("MediaRoutes", () => {
  const props = {
    Content: null,
    changeContent: jest.fn(),
    closeDrawer: jest.fn(),
    history: { push: jest.fn() },
    location: {},
    match: {}
  };

  const mobileLoaded = shallow(MediaRoutes(props, true));
  it("renders mobile", () => {
    expect(mobileLoaded).toMatchSnapshot();
    expect(mobileLoaded).toHaveLength(1);
  });
  const desktopLoaded = shallow(MediaRoutes(props, false));
  it("renders desktop", () => {
    expect(desktopLoaded).toMatchSnapshot();
    expect(desktopLoaded).toHaveLength(1);
  });
});

describe("Redux methods, mapStateToProps", () => {
  const state = {
    drawer: {
      open: false,
      Content: <div>hi</div>
    }
  };

  const expectedProps = {
    visibility: false,
    Content: <div>hi</div>
  };

  it("returns the expected keys", () => {
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});

describe("AsyncTablet", () => {
  const loaded = shallow(<AsyncTablet />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncDesktop", () => {
  const loaded = shallow(<AsyncDesktop />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

import React from "react";
import { shallow } from "enzyme";
import Media from "react-media";
import { Home, mapStateToProps } from "../";

describe("Home", () => {
  const wrapper = shallow(<Home />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Mobile", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: query => {
        return {
          matches: query === "(max-width: 920px)",
          addListener: () => {},
          removeListener: () => {}
        };
      }
    });
  });

  afterAll(() => {
    delete window.matchMedia;
  });

  const mobileWrapper = shallow(<Home />);
  it("renders mobile", () => {
    expect(mobileWrapper).toMatchSnapshot();
    mobileWrapper.render();
    expect(
      mobileWrapper
        .find(Media)
        .at(1)
        .render()
    ).toHaveLength(0);
  });
});

describe("Desktop", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: query => {
        return {
          matches: query === "(min-width: 921px)",
          addListener: () => {},
          removeListener: () => {}
        };
      }
    });
  });

  afterAll(() => {
    delete window.matchMedia;
  });
  const desktopWrapper = shallow(<Home />);
  it("renders desktop", () => {
    expect(desktopWrapper).toMatchSnapshot();
    desktopWrapper.render();
    expect(
      desktopWrapper
        .find(Media)
        .at(0)
        .render()
    ).toHaveLength(0);
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

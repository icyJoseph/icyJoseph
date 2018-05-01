import React from "react";
import { shallow } from "enzyme";
import Media from "react-media";
import { Home } from "../";

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

  const nonSpy = jest.spyOn(Home.prototype, "renderGrid");
  const spy = jest.spyOn(Home.prototype, "renderMobile");
  const mobileWrapper = shallow(<Home />);
  it("renders mobile", () => {
    expect(mobileWrapper).toMatchSnapshot();
    mobileWrapper.render();
    expect(spy).toHaveBeenCalled();
    expect(nonSpy).toHaveBeenCalledTimes(0);
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
  const spy = jest.spyOn(Home.prototype, "renderGrid");
  const nonSpy = jest.spyOn(Home.prototype, "renderMobile");
  const desktopWrapper = shallow(<Home />);
  it("renders desktop", () => {
    expect(desktopWrapper).toMatchSnapshot();
    desktopWrapper.render();
    expect(spy).toHaveBeenCalled();
    // The MobileView function gets called with no arguments
    // This is most likely a bug with react-media
    // To make sure it is not rendered we check for the length at Media[0]
    expect(nonSpy).toHaveBeenCalledTimes(1);
    expect(
      desktopWrapper
        .find(Media)
        .at(0)
        .render()
    ).toHaveLength(0);
  });
});

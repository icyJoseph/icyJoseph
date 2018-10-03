import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Error } from "../../containers/BSOD";
import { browserRender, browserIE } from "../../config";

describe("Returns BSOD App for IE", () => {
  beforeEach(() =>
    Object.defineProperty(window, "navigator", {
      value: { userAgent: "MSIE" },
      configurable: true,
      writable: true
    }));
  it("renders BSOD", () => {
    const App = browserRender();
    expect(browserIE()).toEqual(true);
    expect(
      shallow(<App />)
        .find(Error)
        .dive()
        .text()
    ).toEqual("ERROR IE DETECTED");
  });
});

describe("Returns BSOD App for modern IE", () => {
  beforeEach(() =>
    Object.defineProperty(window, "navigator", {
      value: { userAgent: "Trident" },
      configurable: true,
      writable: true
    }));
  it("renders BSOD for modern IE", () => {
    const App = browserRender();
    expect(browserIE()).toEqual(true);
    expect(
      shallow(<App />)
        .find(Error)
        .dive()
        .text()
    ).toEqual("ERROR IE DETECTED");
  });
});

describe("Returns Routes App for other Browsers", () => {
  beforeEach(() =>
    Object.defineProperty(window, "navigator", {
      value: { userAgent: "Chrome" },
      configurable: true,
      writable: true
    }));
  it("renders Routes in other Browsers", () => {
    const Routes = browserRender();
    expect(browserIE()).toEqual(false);
    expect(shallow(<Routes />).find(BrowserRouter)).toHaveLength(1);
  });
});

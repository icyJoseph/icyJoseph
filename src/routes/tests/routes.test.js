import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Routes, {
  AsyncLanding,
  AsyncHacks,
  AsyncBlog,
  AsyncNoMatch,
  AsyncTopMenu
} from "..";

// jest.mock("react", () => {
//   const r = jest.requireActual("react");

//   return { ...r, memo: x => x };
// });

describe("SnapShot Routes", () => {
  const wrapper = shallow(<Routes />);
  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("AsyncLanding", () => {
  const loaded = shallow(<AsyncLanding />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncHacks", () => {
  const loaded = shallow(<AsyncHacks />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncBlog", () => {
  const loaded = shallow(<AsyncBlog />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncNoMatch", () => {
  const loaded = shallow(<AsyncNoMatch />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("AsyncTopMenu", () => {
  const loaded = shallow(<AsyncTopMenu />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("Routes", () => {
  const mockedStore = {
    getState: jest.fn(() => ({
      github: { repos: [] },
      drawer: { open: false, id: 0 },
      medium: { feed: { articles: {}, user: {} } }
    })),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  };

  it("renders for blog", () => {
    const wrapper = mount(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={["/blog"]}>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(AsyncBlog)).toHaveLength(1);
    expect(wrapper.find(AsyncLanding)).toHaveLength(0);
  });
});

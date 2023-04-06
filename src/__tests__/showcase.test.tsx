import { render, screen, act, waitFor } from "@testing-library/react";
import { mockIntersectionObserver } from "jsdom-testing-mocks";

import { Showcase } from "components/Showcase";
import { exists } from "functional";

type MockData = Record<"id", string>;
const mockData: MockData[] = [
  { id: "0" },
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
];

const isElement = (elem: Element): elem is HTMLElement =>
  elem instanceof HTMLElement;

const Card = (props: MockData) => (
  <span data-testid={props.id}>{props.id}</span>
);

const BackIcon = <i>back-icon</i>;
const FwdIcon = <i>fwd-icon</i>;

const io = mockIntersectionObserver();

/**
 * Testing actual scrolling and such is not very
 * practical within JSDOM's domain.
 *
 * This test keeps track of a bunch of behavior expressed
 * with aria- attributes.
 *
 * It goes as far as to mock the intersection observer.
 * Think of a user actually moving the items around, we
 * just report back to the test environment that "now
 * these items are visible", and the UI follows.
 *
 */
describe("Showcase", () => {
  it("Keeps track of the visible elements", async () => {
    render(
      <Showcase
        Component={Card}
        items={mockData}
        backIcon={BackIcon}
        forwardIcon={FwdIcon}
        ariaLabel="Demo navigation"
      />
    );

    // Make sure the controls are in place
    expect(screen.getByText(/back-icon/i)).toBeInTheDocument();
    expect(screen.getByText(/fwd-icon/i)).toBeInTheDocument();

    const expectedButtonCount =
      2 + // back and fwd
      mockData.length; // one for each item
    expect(screen.getAllByRole("button")).toHaveLength(expectedButtonCount);

    const getRenderedItems = () =>
      mockData.map(({ id }) => screen.getByTestId(id));
    const renderedItems = getRenderedItems();

    expect(renderedItems).toHaveLength(mockData.length);

    const visibleWindow = 3;

    // make the first 3 items visible
    act(() => {
      const nodes = getRenderedItems()
        .slice(0, visibleWindow)
        .map((node) => node.parentElement?.firstElementChild)
        .filter(exists)
        .filter(isElement);

      io.enterNodes(nodes);
    });

    await waitFor(() =>
      expect(
        getRenderedItems().filter(
          (node) => node.parentElement?.getAttribute("aria-hidden") === "false"
        )
      ).toHaveLength(visibleWindow)
    );

    expect(
      screen.getByLabelText("previous").getAttribute("aria-disabled")
    ).toBe("true");

    expect(screen.getByLabelText("next").getAttribute("aria-disabled")).toBe(
      "false"
    );

    act(() => {
      io.leaveAll();

      const nodes = getRenderedItems()
        .slice(-1 * visibleWindow)
        .map((node) => node.parentElement?.firstElementChild)
        .filter(exists)
        .filter(isElement);
      io.enterNodes(nodes);
    });

    await waitFor(() =>
      expect(
        getRenderedItems().filter(
          (node) => node.parentElement?.getAttribute("aria-hidden") === "false"
        )
      ).toHaveLength(visibleWindow)
    );

    expect(
      screen.getByLabelText("previous").getAttribute("aria-disabled")
    ).toBe("false");

    expect(screen.getByLabelText("next").getAttribute("aria-disabled")).toBe(
      "true"
    );

    expect(
      screen
        .getAllByRole("button")
        .filter((el) => el.getAttribute("aria-current") === "true")
    ).toHaveLength(visibleWindow);
  });
});

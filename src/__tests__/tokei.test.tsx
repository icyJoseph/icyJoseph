import { render, screen } from "@testing-library/react";

import { Tokei } from "composition/Tokei";

import tokeiJSON from "../../tokei.json";

describe("Tokei", () => {
  it("renders with header and credit to tokei", () => {
    render(<Tokei tokei={tokeiJSON} name="tokei" />);

    const [headerAnchor, tokeiAnchor] = screen.getAllByRole("link");

    expect(headerAnchor).toHaveAttribute("href", "#tokei");
    expect(tokeiAnchor).toHaveAttribute(
      "href",
      "https://github.com/XAMPPRocky/tokei"
    );
  });
});

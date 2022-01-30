import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "16px",
  4: "32px",
  5: "64px",
  6: "128px",
  7: "256px",
  8: "512px",
  // todo how to map to itself - if not found above
  auto: "auto"
} as const;

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" }
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between"
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse", "initial", "revert", "unset"],

    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,

    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space
  },
  shorthands: {
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    p: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],

    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],

    placeItems: ["justifyContent", "alignItems"]
  }
});

export const sprinkles = createSprinkles(responsiveProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];

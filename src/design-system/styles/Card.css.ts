import { style } from "@vanilla-extract/css";

import { theme } from "styles/theme.css";

export const cardWrapper = style([
  {
    background: theme.colors.softDark,
    color: theme.colors.white,
    position: "relative",
    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 12px rgba(0, 0, 0, 0.23)",
    selectors: {
      "&::after": {
        content: "",
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        opacity: 0,
        borderRadius: "6px",
        boxShadow:
          "0 9px 18px rgba(0, 0, 0, 0.3), 0 9px 18px rgba(0, 0, 0, 0.22)",
        transition: "opacity 0.3s ease-in-out"
      },
      "&:hover::after": {
        opacity: 1
      }
    }
  }
]);

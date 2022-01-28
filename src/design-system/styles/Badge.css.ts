import { style } from "@vanilla-extract/css";

import { theme } from "styles/theme.css";
import { sprinkles } from "design-system/styles/sprinkles.css";

export const topBadge = style([
  {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.colors.smokeyWhite
  },
  sprinkles({ my: 2, mx: "auto" })
]);

import { style } from "@vanilla-extract/css";

export const backgroundWaves = style({
  position: "fixed",

  width: "100vw",
  height: "100vh",

  backgroundAttachment: "scroll",
  backgroundImage: "url(/waves.min.svg)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
});

export const isolatedLayout = style({
  isolation: "isolate"
});

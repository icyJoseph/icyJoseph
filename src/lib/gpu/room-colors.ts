import { flareTokens, roomTokens } from "lib/design/tokens";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export const roomBeamColors = {
  room: hexToRgb(roomTokens[0].hex),
  shade: hexToRgb(roomTokens[1].hex),
  mid: hexToRgb(roomTokens[2].hex),
  flare_dry: hexToRgb(flareTokens[0].hex),
  flare_wet: hexToRgb(flareTokens[1].hex),
  flare_hot: hexToRgb(flareTokens[2].hex),
} as const;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasWebGpu() {
  return (
    typeof navigator !== "undefined" &&
    "gpu" in navigator &&
    Boolean((navigator as Navigator & { gpu?: unknown }).gpu)
  );
}

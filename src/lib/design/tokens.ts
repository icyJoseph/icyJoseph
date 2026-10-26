export const roomTokens = [
  {
    name: "Room",
    css: "room",
    hex: "#030806",
    role: "page ground",
  },
  {
    name: "Shade",
    css: "shade",
    hex: "#0a1612",
    role: "panels, wells, code background",
  },
  {
    name: "Emerald mid",
    css: "shade-mid",
    hex: "#14352c",
    role: "borders, rules",
  },
  {
    name: "Leaf",
    css: "leaf",
    hex: "#5f8f7a",
    role: "meta, quiet text, comments",
  },
] as const;

export const flareTokens = [
  {
    name: "Dry",
    css: "flare",
    hex: "#C46E6D",
    role: "settled ink (Ohuhu FY02 chart)",
  },
  {
    name: "Wet",
    css: "flare-wet",
    hex: "#F97979",
    role: "titles, links (Ohuhu FY02 wet)",
  },
  {
    name: "Hit",
    css: "flare-hot",
    hex: "#FF6B7C",
    role: "primary fill, functions",
  },
  {
    name: "Glow",
    css: "flare-glow",
    hex: "#FF9AA8",
    role: "hover, bloom, strings",
  },
] as const;

export const paperTokens = [
  {
    name: "Paper warm",
    css: "paper-warm",
    hex: "#E8DCCF",
    role: "headings in light, types",
  },
  {
    name: "Paper cool",
    css: "paper-cool",
    hex: "#9BB5A8",
    role: "body copy",
  },
] as const;

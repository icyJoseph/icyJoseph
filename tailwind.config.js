/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "pale-blue": "rgb(var(--pale-blue) / <alpha-value>)",
        "pale-green": "rgb(var(--pale-green) / <alpha-value>)",
        "pale-yellow": "rgb(var(--pale-yellow) / <alpha-value>)",
        "pale-orange": "rgb(var(--pale-orange) / <alpha-value>)",
        "pale-red": "rgb(var(--pale-red) / <alpha-value>)",
        "soft-black": "rgb(var(--soft-black) / <alpha-value>)",
        "smoke-white": "rgb(var(--smoke-white) / <alpha-value>)",
        room: "var(--room)",
        shade: "var(--shade)",
        "shade-mid": "var(--shade-mid)",
        leaf: "var(--leaf)",
        flare: "var(--flare)",
        "flare-wet": "var(--flare-wet)",
        "flare-hot": "var(--flare-hot)",
        "flare-glow": "var(--flare-glow)",
        "paper-warm": "var(--paper-warm)",
        "paper-cool": "var(--paper-cool)",
      },
      fontFamily: {
        sans: ["var(--font-recursive)"],
      },
    },
  },
  plugins: [],
};

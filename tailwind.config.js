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
      },
      fontFamily: {
        sans: ["var(--font-recursive)"],
      },
    },
  },
  plugins: [],
};

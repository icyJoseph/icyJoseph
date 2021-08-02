module.exports = {
  env: {
    browser: true,
    jest: true,
    es2021: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  globals: { IcyJoseph: true },
  plugins: ["@typescript-eslint"],
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  settings: {
    react: { version: "detect" }
  }
};

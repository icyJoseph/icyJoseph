module.exports = {
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "<rootDir>/node_modules/babel-jest",
      {
        presets: [
          "next/babel",
          {
            plugins: [["styled-components", { ssr: true, displayName: true }]]
          }
        ]
      }
    ],
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js"
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  modulePaths: ["<rootDir>/src"],
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  }
};

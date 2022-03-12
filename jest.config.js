// jest.config.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  modulePaths: ["<rootDir>/src"],

  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },

  transform: {
    "<rootDir>/node_modules/next-mdx-remote/serialize.js": [
      "@swc/jest",
      {
        module: { type: "es6" },
      },
    ],
  },

  transformIgnorePatterns: ["/node_modules/next-mdx-remote"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

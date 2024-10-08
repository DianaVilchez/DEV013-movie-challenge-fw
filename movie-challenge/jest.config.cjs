
  /* eslint-env node */
  module.exports = {
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    ],
    moduleNameMapper: {
      "^.+\\.module\\.css$": "identity-obj-proxy",
      "^.+\\.(css|png|jpg|jpeg|svg)$": "<rootDir>/src/tests/__mocks__/file-mock.cjs",
    },
  };

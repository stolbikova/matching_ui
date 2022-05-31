module.exports = {
  transform: {
    "\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      "tsConfig": './tsconfig.json'
    }
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/styleMock.js',
  },
  testEnvironment: "jsdom"
};

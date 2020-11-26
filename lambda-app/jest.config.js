module.exports = {
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageReporters: ["html", "json"],
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        outputDirectory: "reports/results",
      },
    ],
  ],
};

const nextJest = require("next/jest");
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
    dir: "./",
});

const config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleDirectories: ["node_modules", "<rootDir>"],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/.next/",
        "<rootDir>/.tests/",
    ],
    modulePaths: ["<rootDir>"],
    collectCoverage: true,
    coverageReporters: ["lcov", ["text", { skipFull: true }]],
    testResultsProcessor: "jest-sonar-reporter",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(config);

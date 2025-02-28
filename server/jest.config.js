/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts"],
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  roots: ["<rootDir>/src"],

  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[js]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\.tsx?$": ["ts-jest", { useESM: true }],
  },
};

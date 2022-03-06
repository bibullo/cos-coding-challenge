module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!.*.mjs$|@datorama/akita)',
  ],
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    '.mock.ts',
    '.module.ts',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/polyfills.ts',
    '<rootDir>/src/environments',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

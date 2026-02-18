module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          strict: false,
          skipLibCheck: true,
          isolatedModules: true
        },
        diagnostics: {
          ignoreCodes: [151002]
        }
      }
    ]
  }
};
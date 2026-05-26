export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToFileExtensions: {
    ts: 'ts'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.test.ts'],
  setupFilesAfterFramework: ['./src/tests/setup.ts']
}
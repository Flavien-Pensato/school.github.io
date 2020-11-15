module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  unmockedModulePathPatterns: ['<rootDir>/node_modules/react/'],
  roots: ['<rootDir>/'],
};

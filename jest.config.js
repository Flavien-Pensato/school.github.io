module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: ['./config/jest.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

const path = require('path');

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [path.resolve('./config/jest.js')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

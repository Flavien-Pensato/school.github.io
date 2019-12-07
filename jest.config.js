const path = require('path');

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [path.resolve('./config/jest/setup.js')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

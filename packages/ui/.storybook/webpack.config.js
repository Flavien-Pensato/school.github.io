const path = require('path');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  if (env === 'PRODUCTION' && config.plugins[0].options) {
    config.plugins[0].options.filename = 'storybook.html'
  }

  return config;
};

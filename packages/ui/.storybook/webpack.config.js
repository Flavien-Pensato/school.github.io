const path = require('path');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.plugins[0].options.filename = 'storybook.html'

  console.log(config.plugins[0].options.filename);
  return config;
};

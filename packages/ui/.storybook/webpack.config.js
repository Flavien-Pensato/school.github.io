const path = require('path');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  if (env === 'PRODUCTION') {
    config.plugins.forEach(plugin => {
      if (plugin.options && plugin.options.filename === 'index.html') {
        plugin.options.filename = 'storybook.html'
      }
    })
  }

  return config;
};

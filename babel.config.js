module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'emotion',
      {
        sourceMap: false,
        autoLabel: true,
      },
    ],
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    development: {
      plugins: [
        [
          'emotion',
          {
            sourceMap: true,
            autoLabel: true,
          },
        ],
      ],
    },
    production: {
      comments: false,
      plugins: ['babel-plugin-remove-debug'],
    },
  },
};

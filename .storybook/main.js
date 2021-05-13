const path = require('path');

module.exports = {
  'stories': [
    // Set story order in sidebar
    '../src/**/pages/*.stories.js',
    '../src/**/organisms/*.stories.js',
    '../src/**/molecules/*.stories.js',
    '../src/**/atoms/*.stories.js',
    //
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
        styleLoaderOptions: {
          // injectType: 'singletonStyleTag',
        },
      },
    },
  ],
  'webpackFinal': async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    return config;
  },
};
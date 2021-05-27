// Custom config file for processing RABSkin
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-custom-properties')({
      preserve: false,
    }),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
    require('postcss-discard-comments'),
    require('postcss-discard-empty'),
  ],
};
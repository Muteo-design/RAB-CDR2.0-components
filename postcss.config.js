module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-custom-properties')({
      preserve: false,
    }),
    require('postcss-prefix-selector')({
      prefix: '.rab-cdr',
    }),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
};
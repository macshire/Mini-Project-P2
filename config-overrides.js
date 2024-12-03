const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      zlib: false,
      fs: false,  // Not supported in browsers
      net: false, // Not supported in browsers
      http: false, // Optional if not required
      url: false, // Optional if not required
    },
  },
};

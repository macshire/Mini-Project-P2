const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config) {
  // Add polyfills for Node modules in the browser
  config.resolve.fallback = {
    ...config.resolve.alias,
    ...config.resolve.fallback, // Retain existing fallbacks
    'async_hooks': false,
    fs: false, // File system is not supported in browsers
    net: false, // Networking modules are not supported
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    //need to fix process/browser issue
    process: require.resolve("process/browser.js"),
  };

  // Add plugins for polyfills
  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process/browser', // Make `process` available globally
    }),
    new NodePolyfillPlugin(), // Add other Node.js polyfills
  ];

  return config;
};

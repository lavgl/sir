const path = require('path');

const config = require('./config')();

module.exports = {
  entry: path.resolve(config.src.path, 'index.js'),
  target: 'node-webkit',
  output: {
    filename: 'bundle.js',
    path: config.compile.path
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
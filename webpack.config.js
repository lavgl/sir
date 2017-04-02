const path = require('path');

const config = require('./config')();

module.exports = {
  entry: path.resolve(config.src.path, 'index.js'),
  target: 'node-webkit',
  devtool: 'eval',
  output: {
    filename: 'bundle.js',
    path: config.compile.path
  },
  resolve: {
    alias: {
      reducers: path.resolve(config.src.path, 'redux/reducers'),
      actions: path.resolve(config.src.path, 'redux/actions'),
      components: path.resolve(config.src.path, 'components'),
      containers: path.resolve(config.src.path, 'containers'),
      constants: path.resolve(config.src.path, 'constants')
    }
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
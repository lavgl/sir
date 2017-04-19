const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = require('./config')();

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: env
  })
];

if (isProduction) {
  plugins.push(
    new UglifyJSPlugin()
  );
}

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
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'}
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins
};
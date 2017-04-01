const path = require('path');

const appPath = path.resolve(__dirname, 'app');
const sourcePath = path.resolve(appPath, 'src');
const compilePath = path.resolve(__dirname, 'compile');
const buildPath = path.resolve(__dirname, 'build');

module.exports = function () {
  const env = process.env.NODE_ENV || 'development';

  return {
    env,
    production: env === 'production',
    development: env === 'development',
    app: {
      path: appPath,
      title: 'Hello World',
      livereload: 'http://localhost:35729/livereload.js'
    },
    src: {
      path: sourcePath
    },
    compile: {
      path: compilePath,
      htmlMin: {
        collapseWhitespace: true
      }
    },
    build: {
      path: buildPath,
      nw: {
        platforms: ['linux64', 'win32'],
        version: '0.14.7',
        flavor: 'normal'
      }
    }
  };
};
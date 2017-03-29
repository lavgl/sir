const path = require('path');

const appPath = path.resolve(__dirname, 'app');
const sourcePath = path.resolve(appPath, 'src');
const compilePath = path.resolve(__dirname, 'compile');
const buildPath = path.resolve(__dirname, 'build');

module.exports = function () {
  return {
    app: {
      path: appPath
    },
    src: {
      path: sourcePath
    },
    compile: {
      path: compilePath
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
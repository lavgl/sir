const path = require('path');
const gulp = require('gulp');
const del = require('del');

const config = require('../config')();

const cachePath = path.resolve(__dirname, 'cache');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

function cleanTaskFactory({ path }) {
  return () => del(path);
}

gulp.task('clean:compile', cleanTaskFactory({
  path: config.compile.path
}));

gulp.task('clean:cache', cleanTaskFactory({
  path: cachePath
}));

gulp.task('clean:build', cleanTaskFactory({
  path: buildPath
}));

gulp.task('clean:modules', cleanTaskFactory({
  path: nodeModulesPath
}));

gulp.task('clean:all', gulp.parallel([
  'clean:compile',
  'clean:cache',
  'clean:build',
  'clean:modules'
]));
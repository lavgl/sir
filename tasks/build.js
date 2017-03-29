const gulp = require('gulp');
const NwBuilder = require('nw-builder');
const path = require('path');
const gutil = require('gulp-util');

const config = require('../config')();

const nwConfig = Object.assign({}, config.build.nw, {
  files: `${config.compile.path}/**/**.*`
});

const nw = new NwBuilder(nwConfig);

nw.on('log', gutil.log);


gulp.task('nw:build', function() {
  return nw.build();
});
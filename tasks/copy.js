const gulp = require('gulp');
const path = require('path');

const config = require('../config')();

function copyFactory({ from, to }) {
  return function () {
    return gulp.src(from).pipe(gulp.dest(to));
  };
}

gulp.task('copy:package', copyFactory({
  from: path.resolve(config.app.path, 'package.json'),
  to: config.compile.path
}));
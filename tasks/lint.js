const gulp = require('gulp');
const eslint = require('gulp-eslint');

const config = require('../config')();

gulp.task('lint', function () {
  return gulp.src(`${config.src.path}/**/*.js`, '!node_modules/**')
    .pipe(eslint())
    .pipe(eslint.format());
});
const gulp = require('gulp');

const config = require('../config')();

require('./webpack');
require('./lint');
require('./html');
require('./copy');

gulp.task('compile:src', gulp.series('lint', 'webpack'));
gulp.task('compile:src:watch', gulp.series('compile:src', () => {
  gulp.watch(`${config.src.path}/**/*.js`, gulp.series('compile:src'));
}));

gulp.task('compile:html', gulp.series('html'));
gulp.task('compile:html:watch', gulp.series('compile:html', () => {
  gulp.watch(`${config.app.path}/index.html`, gulp.series('compile:html'));
}));

gulp.task('compile:package', gulp.series('copy:package'));
gulp.task('compile:package:watch', gulp.series('compile:package', () => {
  gulp.watch(`${config.app.path}/package.json`, gulp.series('compile:package'));
}));

gulp.task('compile', gulp.parallel([
  'compile:src',
  'compile:html',
  'compile:package'
]));

gulp.task('compile:watch', gulp.parallel([
  'compile:src:watch',
  'compile:html:watch',
  'compile:package:watch'
]));
const gulp = require('gulp');

const config = require('./config')();

require('./tasks/exec');
require('./tasks/livereload');
require('./tasks/build');
require('./tasks/compile');
require('./tasks/clean');

gulp.task('dev', gulp.series([
  'clean:compile',
  'compile',
  gulp.parallel([
    'compile:watch',
    'livereload:listen',
    'nw:exec'
  ])]));

gulp.task('build', gulp.series([
  'clean:compile',
  'compile',
  'nw:build'
]));

gulp.task('default', gulp.series('dev'));
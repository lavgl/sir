const gulp = require('gulp');

const config = require('./config')();

require('./tasks/webpack');
require('./tasks/exec');
require('./tasks/livereload');
require('./tasks/build');
require('./tasks/copy');
require('./tasks/lint');

gulp.task('webpack:watch', gulp.series('lint', 'webpack', function () {
  gulp.watch(`${config.src.path}/**/*.*`, gulp.series('lint', 'webpack'));
}));

gulp.task('dev', gulp.parallel([
  'webpack:watch',
  'livereload:listen',
  gulp.series('copy', 'nw:exec')
]));

gulp.task('build', gulp.series(
  gulp.parallel(['webpack', 'copy']),
  'nw:build'
));

gulp.task('default', gulp.series('dev'));
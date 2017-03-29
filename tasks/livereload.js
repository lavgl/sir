const gulp = require('gulp');
const livereload = require('gulp-livereload');

gulp.task('livereload:listen', function() {
  livereload.listen();
});
const path = require('path');
const gulp = require('gulp');
const template = require('gulp-template');
const htmlmin = require('gulp-htmlmin');
const _if = require('gulp-if');

const config = require('../config')();
const indexHtmlSrcPath = path.resolve(config.app.path, 'index.html');

const data = {
  title: config.app.title,
  development: config.development,
  livereload: config.app.livereload
};

function htmlTask() {
  return gulp.src(indexHtmlSrcPath)
    .pipe(template(data))
    .pipe(_if(config.production, htmlmin(config.compile.htmlMin)))
    .pipe(gulp.dest(config.compile.path))
}

gulp.task('html', htmlTask);
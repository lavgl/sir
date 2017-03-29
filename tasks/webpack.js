const gulp = require('gulp');
const gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const livereload = require('gulp-livereload');
const _if = require('gulp-if');


function webpackTaskFactory(webpackConfig, watch) {
  return function() {
    return gulp
      .src(webpackConfig.entry)
      .pipe(gulpWebpack(webpackConfig, webpack))
      .pipe(gulp.dest(webpackConfig.output.path))
      .pipe(_if(watch, livereload()));
  }
}

gulp.task('webpack', webpackTaskFactory(webpackConfig, true));
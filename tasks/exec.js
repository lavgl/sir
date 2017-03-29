const gulp = require('gulp');
const exec = require('child_process').exec;
const path = require('path');
const nwPath = require('nw').findpath();

const config = require('../config')();

gulp.task('nw:exec', function() {
  const command = `${nwPath} ${config.compile.path}`;
  return exec(command, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
  });
});
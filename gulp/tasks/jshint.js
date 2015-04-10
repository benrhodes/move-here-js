'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var lint = function() {
   return gulp.src('./src/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish));
};

gulp.task('lint', lint);
module.exports = lint;
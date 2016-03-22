'use strict';

var gulp = require('gulp');
var rollup = require('gulp-rollup');
var concat = require('gulp-concat');

var bundleTask = function(){
   gulp.src('src/exports.js', {read: false})
      .pipe(rollup({
         sourceMap: false,
         format: 'es6'
      }))
      .pipe(concat('move-here-es6.js'))
      .pipe(gulp.dest('dist'));
};

gulp.task('bundleES6', ['lint', 'karma'], bundleTask);
module.exports = bundleTask;
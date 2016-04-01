'use strict';

var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require("rollup-plugin-babel");
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var bundleTask = function(){
   gulp.src('src/exports.js', {read: false})
      .pipe(sourcemaps.init())
      .pipe(rollup({
         sourceMap: true,
         format: 'iife',
         plugins: [
            babel()
         ]
      }))
      .pipe(concat('move-here.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
};

gulp.task('bundle', ['lint', 'karma'], bundleTask);
module.exports = bundleTask;
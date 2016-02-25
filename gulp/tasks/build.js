'use strict';

var gulp = require('gulp');
var rollup = require('gulp-rollup');
var rename = require("gulp-rename");
var babel = require("rollup-plugin-babel");

var bundleTask = function(){
   gulp.src('src/exports.js', {read: false})
      .pipe(rollup({
         sourceMap: true,
         plugins: [
            babel()
         ]
      }))
      .pipe(rename("move-here.js"))
      .pipe(gulp.dest('dist'));
};

gulp.task('bundle', bundleTask);
module.exports = bundleTask;
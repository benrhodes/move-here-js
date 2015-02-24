'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

var browserifyTask = function() {
   return browserify('./src/exports.js')
      .bundle()
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('move-here.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
};

gulp.task('browserify', browserifyTask);
module.exports = browserifyTask;
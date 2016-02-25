'use strict';

var gulp = require('./gulp')([
   'webserver',
   'build'
]);

gulp.task('default', ['build']);
'use strict';

var gulp = require('./gulp')([
   'browserify',
   'webserver'
]);

gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
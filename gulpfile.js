'use strict';

var gulp = require('./gulp')([
   'browserify',
   'webserver',
   'jshint'
]);

gulp.task('build', ['lint', 'browserify']);
gulp.task('default', ['build']);
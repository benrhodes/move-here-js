'use strict';

var gulp = require('./gulp')([
   'webserver',
   'jshint',
   'jsdoc',
   'cleandocs',
   'babel'
]);

gulp.task('build', ['babel']);
gulp.task('default', ['build']);
gulp.task('docs', ['cleandocs', 'jsdoc']); // does not work with ES6 syntax
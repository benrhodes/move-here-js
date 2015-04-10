'use strict';

var gulp = require('./gulp')([
   'browserify',
   'webserver',
   'jshint',
   'jsdoc',
   'cleandocs'
]);

gulp.task('build', ['lint', 'browserify']);
gulp.task('default', ['build']);
gulp.task('docs', ['cleandocs', 'jsdoc']);
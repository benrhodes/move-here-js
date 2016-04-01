'use strict';

var gulp = require('./gulp')([
   'webserver',
   'lint',
   'karma',
   'bundle',
   'bundle-es6',
   'minify'
]);

gulp.task('release', ['bundle', 'bundleES6', 'minify']);
gulp.task('default', ['release']);
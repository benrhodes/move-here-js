'use strict';

var gulp = require('./gulp')([
   'webserver',
   'lint',
   'karma',
   'bundle',
   'minify'
]);

gulp.task('release', ['bundle', 'minify']);
gulp.task('default', ['release']);
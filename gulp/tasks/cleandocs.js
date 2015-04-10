'use strict';

var gulp   = require('gulp');
var clean = require('gulp-clean');

var cleanDocs = function() {
   return gulp.src('./docs/*', {read: false})
      .pipe(clean({force: true}));
};

gulp.task('clean', cleanDocs);
module.exports = cleanDocs;
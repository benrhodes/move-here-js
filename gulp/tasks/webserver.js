'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

var webserverTask = function() {
   return gulp.src('./build')
      .pipe(webserver({
         livereload: true,
         directoryListing: {
            enable:true,
            path: './build'
         },
         open: true
      }));
};

gulp.task('webserver', webserverTask);
module.exports = webserverTask;
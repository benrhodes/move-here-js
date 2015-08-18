'use strict';

// Current task does not work with ES6
var gulp   = require('gulp');
var jsdoc = require("gulp-jsdoc");

var doc = function() {
   return gulp.src("./src/*.js")
      .pipe(jsdoc('./docs'))
};

gulp.task('jsdoc', doc);
module.exports = doc;
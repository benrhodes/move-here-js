'use strict';

var gulp   = require('gulp');
var jsdoc = require("gulp-jsdoc");

var doc = function() {
   return gulp.src("./src/*.js")
      .pipe(jsdoc('./docs'))
};

gulp.task('jsdoc', doc);
module.exports = doc;
'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
   var bundler = watchify(browserify('./src/exports.js', { debug: true }).transform(babel));

   function rebundle() {
      bundler.bundle()
         .on('end', function() { console.log('-> done '); })
         .on('error', function(err) { console.error(err); this.emit('end'); })
         .pipe(source('move-here.js'))
         .pipe(buffer())
         .pipe(sourcemaps.init({ loadMaps: true }))
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest('./build'))
   }

   if (watch) {
      bundler.on('update', function() {
         console.log('-> bundling...');
         rebundle();
      });
   }

   rebundle();
}

var bableTask = function() {
   return compile();
};

var watch = function() {
   return compile(true);
};

gulp.task('watch', watch);
gulp.task('babel', bableTask);
module.exports = bableTask;
module.exports = watch;
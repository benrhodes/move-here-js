'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var uglify = require('gulp-uglify');

var destFolder = './dist';
var buildFolder = './build';

function compile(params) {
   params = params || {};
   var bundler = watchify(browserify('./src/exports.js', { debug: true }).transform(babel));

   function distBundle() {
      bundler.bundle()
         .on('end', function() {
            console.log('-> done min ');
            buildBundle(destFolder);
         })
         .on('error', function(err) { console.error(err); this.emit('end'); })
         .pipe(source('move-here.min.js'))
         .pipe(buffer())
         .pipe(uglify())
         .pipe(gulp.dest(destFolder));
   }

   function buildBundle(dest) {
      dest = dest || buildFolder;
      bundler.bundle()
         .on('end', function() { console.log('-> done '); })
         .on('error', function(err) { console.error(err); this.emit('end'); })
         .pipe(source('move-here.js'))
         .pipe(buffer())
         .pipe(sourcemaps.init({ loadMaps: true }))
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest(dest));
   }

   if (params.watch) {
      bundler.on('update', function() {
         console.log('-> bundling...');
         buildBundle();
      });
   }

   if(params.dist) {
      distBundle();
   } else {
      buildBundle();
   }
}

var dist = function() {
   return compile({dist:true});
};

var build = function() {
   return compile();
};

var watch = function() {
   return compile({watch:true});
};

gulp.task('watch', watch);
gulp.task('dist', dist);
gulp.task('build', build);
module.exports = watch;
module.exports = dist;
module.exports = build;
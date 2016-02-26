var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require("rollup-plugin-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var minifyTask = function(){
   gulp.src('src/exports.js', {read: false})
      .pipe(rollup({
         sourceMap: true,
         format: 'iife',
         plugins: [
            babel()
         ]
      }))
      .pipe(uglify())
      .pipe(rename('move-here.min.js'))
      .pipe(gulp.dest('dist'));
};

gulp.task('minify', ['lint', 'karma'], minifyTask);
module.exports = minifyTask;
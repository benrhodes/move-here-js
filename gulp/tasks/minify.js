var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var uglifyTask = function(){
   return gulp.src('dist/move-here.js')
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename('move-here.min.js'))
      .pipe(gulp.dest('dist/'))
};

gulp.task('minify', uglifyTask);
module.exports = uglifyTask;
var gulp = require('gulp');
var eslint = require('gulp-eslint');

var lintTask = function(){
   return gulp.src('src/**/*.js')
      // default: use local linting config
      .pipe(eslint())
      // format ESLint results and print them to the console
      .pipe(eslint.format());
};

gulp.task('lint', lintTask);
module.exports = lintTask;
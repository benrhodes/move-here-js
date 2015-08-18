'use strict';

var gulp = require('gulp');
var Server = require('karma').Server;

var karma = function (done) {
   new Server({
      configFile: '../../../karma.conf.js',
      singleRun: true
   }, done).start();
};

gulp.task('karma', karma);
module.exports = karma;
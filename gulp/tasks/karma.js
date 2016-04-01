'use strict';

var gulp = require('gulp');
var Server = require('karma').Server;

var karmaTask = function (done) {
   new Server({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true
   }, done).start();
};

gulp.task('karma', karmaTask);
module.exports = karmaTask;
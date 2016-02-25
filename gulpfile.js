'use strict';

var gulp = require('./gulp')([
   'webserver',
   'build'
]);

var Server = require('karma').Server;
var karma = function (done) {
   new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
   }, done).start();
};

gulp.task('karma', karma);
gulp.task('default', ['build']);
'use strict';

var gulp = require('./gulp')([
   'webserver',
   'jshint',
   'cleandocs',
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
gulp.task('debugBuild', ['karma', 'build']);
gulp.task('distBuild', ['karma', 'dist']);
gulp.task('default', ['debugBuild']);
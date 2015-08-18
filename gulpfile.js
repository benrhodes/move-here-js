'use strict';

var gulp = require('./gulp')([
   'webserver',
   'jshint',
   'jsdoc',
   'cleandocs',
   'babel'
]);

var Server = require('karma').Server;
var karma = function (done) {
   new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
   }, done).start();
};

gulp.task('karma', karma);
gulp.task('build', ['karma', 'babel']);
gulp.task('default', ['build']);
gulp.task('docs', ['cleandocs', 'jsdoc']); // does not work with ES6 syntax
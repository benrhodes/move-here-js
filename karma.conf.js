/* global module */
module.exports = function (config) {
   'use strict';
   config.set({
      autoWatch: true,
      singleRun: true,

      frameworks: ['jspm', 'jasmine'],

      files: [
         'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'
      ],

      jspm: {
         config: 'src/config.js',
         loadFiles: [
            'src/*.spec.js'
         ],
         serveFiles: [
            'src/!(*spec).js'
         ]
      },

      proxies: {
         '/base': '/base/src'
      },

      browsers: ['PhantomJS'],
      reporters: ['progress']
   });
};
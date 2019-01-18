/* global module */
module.exports = function (config) {
   'use strict';
   config.set({
      basePath: '',
      autoWatch: true,
      singleRun: true,
      frameworks: ['jasmine'],
      files: [
         'tests/**/*.spec.js'
      ],
      preprocessors: {
         'tests/**/*.spec.js': ['rollup']
      },
      rollupPreprocessor: {
         plugins: [
            require('rollup-plugin-babel')()
         ],
         output: {
            format: 'iife',
            name: 'MoveHere',
            sourcemap: 'inline'
         }
      },
      plugins: [
         'karma-jasmine',
         'karma-chrome-launcher',
         'karma-rollup-preprocessor'
      ],
      port: 9876,
      browsers: ['ChromeHeadless'],
      reporters: ['progress']
   });
};
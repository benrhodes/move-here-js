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
         rollup: {
            plugins: [
               require('rollup-plugin-babel')({
                  presets: [
                     require('babel-preset-es2015-rollup')
                  ]
               })
            ]
         },
         bundle: {
            sourceMap: 'inline'
         }
      },
      plugins: [
         'karma-jasmine',
         'karma-phantomjs-launcher',
         'karma-rollup-preprocessor'
      ],
      port: 9876,
      browsers: ['PhantomJS'],
      reporters: ['progress']
   });
};
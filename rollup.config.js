// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import {eslint} from 'rollup-plugin-eslint';
import {terser} from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';

let min = false;
let useBabel = false;
let fileName = 'move-here.mjs';
let createSourceMap = false;
let format = 'es';
if (process.env.NODE_ENV === 'production') {
   min = true;
   createSourceMap = true;
   fileName = 'move-here.min.mjs';
} else if (process.env.NODE_ENV === 'dev-es5') {
   useBabel = true;
   format = 'iife';
   fileName = 'move-here.js';
} else if (process.env.NODE_ENV === 'production-es5') {
   min = true;
   useBabel = true;
   format = 'iife';
   createSourceMap = true;
   fileName = 'move-here.min.js';
}

export default {
   input: 'src/index.js',
   output: {
      file: `dist/${fileName}`,
      name: 'MoveHere',
      format: format,
      sourcemap: createSourceMap
   },
   plugins: [
      resolve(),
      eslint(),
      (useBabel && babel({
         exclude: 'node_modules/**'
      })),
      (min && terser())
   ]
};
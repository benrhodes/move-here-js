// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import {eslint} from 'rollup-plugin-eslint';
import {terser} from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';

let min = false;
let useBabel = false;
let fileName = 'move-here.js';
var createSourceMap = false;
if (process.env.NODE_ENV === 'production') {
   min = true;
   createSourceMap = true;
   fileName = 'move-here.min.js';
} else if (process.env.NODE_ENV === 'dev-es5') {
   useBabel = true;
   fileName = 'move-here-es5.js';
} else if (process.env.NODE_ENV === 'production-es5') {
   min = true;
   useBabel = true;
   createSourceMap = true;
   fileName = 'move-here-es5.min.js';
}

export default {
   input: 'src/index.js',
   output: {
      file: `dist/${fileName}`,
      name: 'MoveHere',
      format: 'iife',
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
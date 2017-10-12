import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    name: 'Cowtest',
    plugins: [
      resolve({
        extensions: ['.js', '.json'],
        preferBuiltins: true,
      }),
      json(),
      {
        transform(code, id) {
          return {
            code: /\bcheerio\b/.test(id) ? code.replace(/(\.default)\b/g, '$1_') : code,
          };
        },
      },
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];

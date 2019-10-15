import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import multiEntry from 'rollup-plugin-multi-entry'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import alias from 'rollup-plugin-virtual-alias'
import path from 'path'

const isDev = process.env.NODE_ENV !== 'production'

export default {
  input: 'web-components.js',
  output: {
    file: isDev ? 'dist/bundle.js' : 'dist/bundle.min.js',
    format: 'iife'
  },
  plugins: [
    multiEntry({ exports: false }),
    resolve({
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    json({
      include: 'node_modules/**'
    }),
    globals(),
    builtins(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    !isDev && terser(),
    ...(isDev
      ? [
          livereload(),
          serve({
            open: 'true',
            contentBase: path.resolve(__dirname),
            host: 'localhost',
            port: 8080,
            openPage: '/'
          })
        ]
      : [])
  ]
}

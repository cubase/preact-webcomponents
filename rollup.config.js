import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import multiEntry from 'rollup-plugin-multi-entry'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
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
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
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

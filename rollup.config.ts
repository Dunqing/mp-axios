import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import camelCase from 'lodash.camelcase'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
const pkg = require('./package.json')

const libraryName = 'axios'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          configFile: path.resolve(__dirname, './.babelrc'),
          allowAllFormats: true
        }),
        terser({
          compress: {
            dead_code: true,
            drop_console: true,
            drop_debugger: true
          }
        })
      ]
    },
    {
      file: pkg.browser,
      name: 'Axios',
      format: 'iife',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          sourceType: 'script',
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: false,
                modules: 'commonjs',
                targets: {
                  esmodules: true
                }
              }
            ]
          ],
          allowAllFormats: true
        }),
        terser({
          compress: {
            dead_code: true,
            drop_console: true,
            drop_debugger: true
          }
        })
      ]
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          configFile: path.resolve(__dirname, './.babelrc'),
          allowAllFormats: true
        }),
        terser({
          compress: {
            dead_code: true,
            drop_console: true,
            drop_debugger: true
          }
        })
      ]
    }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [/@babel\/runtime/],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    resolve(),
    json(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // Compile TypeScript files
    typescript({
      tsconfig: 'tsconfig.json'
    })
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
  ]
}

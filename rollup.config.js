import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser'

const mode = JSON.stringify(process.env.NODE_ENV ?? 'production')
const isMinify = process.env.MINIFY ?? false

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/scripts/index.tsx',
  output: {
    dir: 'dist/scripts',
    format: 'es',
    generatedCode: 'es2015',
    plugins: [...(isMinify ? [terser()] : [])],
    compact: isMinify,
    minifyInternalExports: isMinify,
  },
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    'restyle/styled',
    'graphql-request',
  ],
  plugins: [
    replace({
      values: {
        'process.env.NODE_ENV': mode,
        'globalThis.process.env.NODE_ENV': mode,
      },
      preventAssignment: true,
      objectGuards: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.mjs', '.js', '.json', '.tsx', '.ts'], // needs for '.js' reference in code
    }),
    json(),
    commonjs(),
    babel({ extensions: ['.tsx', '.ts'], babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    copy({
      targets: [
        {
          src: 'src/index.html',
          dest: 'dist',
        },
        {
          src: 'src/style.css',
          dest: 'dist',
        },
        {
          src: 'src/favicon.*',
          dest: 'dist',
        },
      ],
    }),
  ],
}

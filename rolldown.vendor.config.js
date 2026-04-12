import path from 'node:path'
import { defineConfig } from 'rolldown'

const isMinify = Boolean(process.env.MINIFY)
const r = p => path.resolve(process.cwd(), p)

export default defineConfig({
  input: {
    react: r('src/vendor-entries/react.js'),
    'react/jsx-runtime': r('src/vendor-entries/react-jsx-runtime.js'),
    'react-dom': r('src/vendor-entries/react-dom.js'),
    'react-dom/client': r('src/vendor-entries/react-dom-client.js'),
    'graphql-request': r('node_modules/graphql-request/build/entrypoints/main.js'),
    'restyle/styled': r('node_modules/restyle/dist/src/styled.js'),
  },
  platform: 'browser',
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.tsx', '.ts'],
  },
  preserveEntrySignatures: 'strict',
  output: {
    dir: 'dist/vendor',
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: 'chunks/[name]-[hash].js',
    generatedCode: { preset: 'es2015' },
    minify: isMinify,
    comments: false,
  },
})

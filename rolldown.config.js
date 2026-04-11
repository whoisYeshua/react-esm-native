import { defineConfig } from 'rolldown'
import copy from 'rollup-plugin-copy'

const mode = JSON.stringify(process.env.NODE_ENV ?? 'production')
const isMinify = Boolean(process.env.MINIFY)

export default defineConfig({
  input: 'src/scripts/index.tsx',
  platform: 'browser',
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.tsx', '.ts'],
  },
  output: {
    dir: 'dist/scripts',
    format: 'esm',
    generatedCode: { preset: 'es2015' },
    minify: isMinify,
  },
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    'restyle/styled',
    'graphql-request',
  ],
  define: {
    'process.env.NODE_ENV': mode,
    'globalThis.process.env.NODE_ENV': mode,
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/style.css', dest: 'dist' },
        { src: 'src/favicon.*', dest: 'dist' },
      ],
    }),
  ],
})

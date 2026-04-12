import fs from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const sourcePath = path.resolve(projectRoot, 'src/index.html')
const outputPath = path.resolve(projectRoot, 'dist/index.html')

const vendorImports = {
  react: './vendor/react.js',
  'react/jsx-runtime': './vendor/react/jsx-runtime.js',
  'react-dom': './vendor/react-dom.js',
  'react-dom/client': './vendor/react-dom/client.js',
  'graphql-request': './vendor/graphql-request.js',
  'restyle/styled': './vendor/restyle/styled.js',
}

const preloadHrefs = [
  './vendor/react.js',
  './vendor/react/jsx-runtime.js',
  './vendor/react-dom.js',
  './vendor/react-dom/client.js',
]

const indent = (value, spaces) =>
  value
    .split('\n')
    .map(line => `${' '.repeat(spaces)}${line}`)
    .join('\n')

const importMapTag = [
  '    <script type="importmap">',
  indent(JSON.stringify({ imports: vendorImports }, null, 2), 6),
  '    </script>',
].join('\n')

const preloadTags = preloadHrefs
  .map(href => `    <link rel="modulepreload" href="${href}" />`)
  .join('\n')

let html = await fs.readFile(sourcePath, 'utf8')

html = html.replace(/^\s*<script type="importmap">[\s\S]*?^\s*<\/script>\n?/m, `${importMapTag}\n`)
html = html.replace(/^\s*<link rel="modulepreload" href="[^"]+" \/>\n?/gm, '')
html = html.replace(
  /^\s*<script src="scripts\/index\.js" type="module"><\/script>/m,
  `${preloadTags}\n    <script src="scripts/index.js" type="module"></script>`,
)

if (html.includes('esm.sh')) {
  throw new Error('Production index.html still contains esm.sh references')
}

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, html)

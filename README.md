# React truthly ESM example

This application using React with the latest capabilities of ESM modules, such as native import (without transpilation to CJS/AMD and global), `dynamic import`, `importmaps` (the core of this approach), and `modulepreload`. This approach enables the application to load code and resources asynchronously, which results in faster load times and better user experience. By using import maps, app can easily manage dependencies and load modules from different sources, making it easier to maintain the application. Additionally, modulepreload is used to optimize the performance of the application by loading critical modules first. Overall, the use of these modern web technologies results in a more scalable, maintainable, and performant application that provides a better experience without using bundlers with their chunk strategy.

Compilers (babel\swc) are used only to transform TSX\TS code into one that browsers understand

## Local development

Build & run server on http://localhost/

```bash
npm i
npm start # babel compiler
docker-compose up -d
```

## Resoucres

- [Preloading modules](https://developer.chrome.com/blog/modulepreload/) - Sérgio Gomes

- [ES Module Preloading & Integrity](https://guybedford.com/es-module-preloading-integrity) - Guy Bedford

- [You might not need Module Federation: orchestrate your microfrontends at runtime with import maps](https://www.mercedes-benz.io/2023/01/05/you-might-not-need-module-federation-orchestrate-your-microfrontends-at-runtime-with-import-maps/) - Vladimir Zaikin

- [Everything You Need to Know About JavaScript Import Maps](https://www.honeybadger.io/blog/import-maps/) - Ayooluwa Isaiah

- [FAST SMART GLOBAL ESM>CDN](https://esm.sh/)

## Browser Support

- [import](https://caniuse.com/mdn-javascript_operators_import)

- [dynamic import](https://caniuse.com/es6-module-dynamic-import)

- [importmaps](https://caniuse.com/import-maps)

- [link rel="modulepreload"](https://caniuse.com/link-rel-modulepreload)

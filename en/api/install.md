# Installation Guide

Dinero.js provides builds for different environments. You can use it as a browser global with a `<script>` tag (UMD), import it as a native ES module in modern browsers or in projects using a module bundler like Webpack, inject it in projects that support asynchronous modules like Require.js or SystemJS (AMD), or use it with Node.js and any system that supports the CommonJS syntax.

It also comes with polyfilled versions for older browsers.

## Install

The recommended way of install is via [npm][npm] or [Yarn][yarn]:

```bash
npm install dinero.js --save
# or
yarn add dinero.js
```

You can also [download the files directly][jsdelivr:landing] or use the [jsDelivr CDN][jsdelivr:cdn].

## Setup

### UMD (browser global)

Include Dinero.js with a `<script>` tag in your HTML file to export `Dinero` onto the `window` global.

```html
<script src="path/to/umd/dinero.js"></script>
```

### CommonJS (Node.js, Browserify)

```js
const Dinero = require('dinero.js')
```

### ES module (modern browsers, Webpack, etc.)

```js
import Dinero from 'path/to/esm/dinero.js'
```

### AMD (RequireJS, SystemJS, etc.)

```js
requirejs(['path/to/amd/dinero'], function(Dinero) {
  // ...
})
```

### TypeScript

For Typescript typings, you can use the definition file from [DefinitelyTyped][definitelytyped].

```sh
npm install @types/dinero.js --save
```

**This is a third-party file.** Please report issues and open PRs for it on the [DefinitelyTyped][definitelytyped] repository.

## Initialize

You can create Dinero objects and access its methods via the `Dinero` function.

```js
Dinero(); // returns a new Dinero object
```

If you wish, you can also use an alias:

```js
const Money = Dinero;

Money(); // returns a new Dinero object
```

## Compatibility

### Browser

Any browser that supports the [Internationalization API][mdn:intl] is compatible with Dinero.js. This includes [most modern browsers][caniuse:intl], and Internet Explorer 11. For the latter, you need to use the polyfilled version, which is available in every build.

You can use the polyfilled version of Dinero.js with browsers older than IE11, but you won't be able to use the [toFormat][dinero:to-format] method.

### Node.js

You need at least Node 6 with [full-icu support][node:full-icu].

[npm]: https://www.npmjs.com
[yarn]: https://yarnpkg.com
[jsdelivr:landing]: https://www.jsdelivr.com/package/npm/dinero.js
[jsdelivr:cdn]: https://cdn.jsdelivr.net/npm/dinero.js/build
[github:dinero:typescript]: https://github.com/sarahdayan/dinero.js/pull/29
[mdn:intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[caniuse:intl]: https://caniuse.com/#feat=internationalization
[dinero:to-format]: /api-reference/transformation-and-formatting/to-format/
[node:full-icu]: https://nodejs.org/api/intl.html#intl_embed_the_entire_icu_full_icu
[definitelytyped]: https://github.com/DefinitelyTyped/DefinitelyTyped

# Quick Start

Dinero.js makes it easy to create, calculate and format monetary values in JavaScript. You can perform arithmetic operations, extensively parse and format them, check for many things to make your development process more manageable and safer.

**Note:** The library is globally available in the docs for you to be able to test it right in the browser console.

## Getting started

Before you can create Dinero objects, you need to install and setup the library. Dinero.js provides builds for different environments. It also comes with polyfilled versions for older browsers.

You can install the library from [npm][npm:dinero], [download the files directly][jsdelivr:landing] or use the [jsDelivr CDN][jsdelivr:cdn].

<div>
  <table>
    <tbody>
      <tr>
        <td>
          UMD
        </td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/umd/dinero.js" target="_blank">Debug</a></td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/umd/dinero.min.js" target="_blank">Minified</a></td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/umd/dinero.polyfilled.js" target="_blank">Polyfilled</a></td>
        <td>
          <code>&lt;script src="path/to/umd/dinero.js"&gt;&lt;/script&gt;</code>
        </td>
      </tr>
      <tr>
        <td>
          CommonJS
        </td>
        <td colspan="3">
          <code>npm install dinero.js --save</code>
        </td>
        <td>
          <code>const Dinero = require('dinero.js')</code>
        </td>
      </tr>
      <tr>
        <td>
          ES module
        </td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/esm/dinero.js" target="_blank">Debug</a></td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/esm/dinero.min.js" target="_blank">Minified</a></td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/esm/dinero.polyfilled.js" target="_blank">Polyfilled</a></td>
        <td>
          <code>import Dinero from 'path/to/esm/dinero.js'</code>
        </td>
      </tr>
      <tr>
        <td>
          AMD
        </td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/amd/dinero.js" target="_blank">Debug</a></td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/amd/dinero.min.js" target="_blank">Minified</a></td>
        <td><a href="https://cdn.jsdelivr.net/npm/dinero.js@latest/build/amd/dinero.polyfilled.js" target="_blank">Polyfilled</a></td>
        <td>
          <code>requirejs(['path/to/amd/dinero'])</code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

For more details, see the [full installation guide][dinero:install].

## Your first Dinero instance

To get started, you need to create a new Dinero instance. You specify amounts in **minor currency units** (e.g., "cents" for the dollar). You can also specify an [ISO 4217 currency code][wiki:iso-4217] (default is `USD`).

This represents €50:

```js
const price = Dinero({ amount: 5000, currency: 'EUR' })
```

You can add or subtract any amount you want, by passing it another Dinero instance:

```js
// returns a Dinero object with amount: 5500
price.add(Dinero({ amount: 500, currency: 'EUR' }))

// returns a Dinero object with amount: 4500
price.subtract(Dinero({ amount: 500, currency: 'EUR' }))
```

Dinero.js is immutable, which means you always get a new Dinero instance when you perform any transformation on it. Your original instance remains untouched.

```js
price // still returns a Dinero object with amount: 5000
```

All transformative operations return a Dinero instance, so you can chain methods away as you like:

```js
// returns a Dinero object with amount: 4000
Dinero({ amount: 500 })
  .add(Dinero({ amount: 500 }))
  .multiply(4)
```

**Note:** because method calls are executed sequentially, **mathematical operator precedence doesn't apply**. When you execute the code above, the addition happens before the multiplication, evaluating to `4000`, while `500 + 500 * 4` would normally evaluate to `2500`. If you need an operation to happen before another, you need to make sure you call it first.

You can ask all kinds of questions to your Dinero instance. You get a `Boolean` in return:

```js
// returns true
Dinero({ amount: 500 }).equalsTo(Dinero({ amount: 500 }))

// returns false
Dinero({ amount: 100 }).isZero()

// returns true
Dinero({ amount: 1150 }).hasCents()
```

## Displaying a Dinero object

Because Dinero.js uses `Number.toLocaleString` under the hood, you can display it into any format, for any language. However, no need to pass complex objects of options to format Dinero instances to your liking. Dinero.js works with intuitive `String` masks:

```js
// returns $5.00
Dinero({ amount: 500 }).toFormat('$0,0.00')
```

When you set the locale before you call `toFormat`, you get a display result with the proper format:

```js
// returns 5 000 $US
Dinero({ amount: 500000 })
  .setLocale('fr-FR')
  .toFormat('$0,0')
```

If you don't want to set the locale all the time, you can also define it globally:

```js
Dinero.globalLocale = 'de-DE'

// returns 5.000 $
Dinero({ amount: 500000 }).toFormat('$0,0')
```

You can still pass a locale to your Dinero instance if you need, to override the global one. When you use a transformative method on a Dinero object, its local locale is inherited.

```js
// returns 10 $US
Dinero({ amount: 500 })
  .setLocale('fr-FR')
  .add(Dinero({ amount: 500 }))
  .toFormat('$0,0')
```

## Handling different precisions

By default, new Dinero objects represent monetary values with two decimal places. If you want to represent more, or if you're using a currency with a different [exponent](https://en.wikipedia.org/wiki/ISO_4217#Treatment_of_minor_currency_units_(the_%22exponent%22)), you can specify a precision.

```js
// represents $10.545
Dinero({ amount: 10545, precision: 3 })

// The Japanese yen doesn't have sub-units
// this represents ¥1
Dinero({ amount: 1, currency: 'JPY', precision: 0 })
```

If you're using the same currency more than once, it might be worth setting a default precision.

```js
// The Iraqi dinar has up to 3 sub-units
Dinero.defaultCurrency = 'IQD'
Dinero.defaultPrecision = 3

// represents IQD1
Dinero({ amount: 1000 })
```

## Going further

What we saw is only a preview of what you can do. Dinero.js has extensive documentation with examples for all of its methods.

[Browse full API Reference][dinero:api]

[npm:dinero]: https://www.npmjs.com/dinero.js
[dinero:install]: /api-reference/install.html
[jsdelivr:landing]: https://www.jsdelivr.com/package/npm/dinero.js
[jsdelivr:cdn]: https://cdn.jsdelivr.net/npm/dinero.js/build
[wiki:iso-4217]: https://en.wikipedia.org/wiki/ISO_4217
[dinero:api]: /api-reference/

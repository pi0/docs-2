# What is Dinero.js?

Dinero.js lets you create, calculate and format monetary values in JavaScript. You can do math, parse and format your objects, ask them questions and **make your development process easier**.

It provides:

- An immutable and chainable API.
- Global settings support.
- Extended formatting and rounding options.
- Native Intl support (no additional locale files).
- Currency conversion. 

```js
Dinero.defaultCurrency = 'EUR'

Dinero({ amount: 500 })
  .add(Dinero({ amount: 100 }))
  .multiply(4)
  .setLocale('en-GB')
  .toFormat('$0,0.0') // returns "€24.0"
```

**Dinero.js is to money what Moment.js is to dates.**

## Why does Dinero.js exists?

There is much more to money than meets the eye. It’s way more than the `Number` data type can take.

### Money is more than just a number

The amount part of a monetary value is only relative to another aspect: its currency. There’s no such thing as 10 “money”. It’s 10 dollars, 10 euros, 10 bitcoins… If you want to add two monetary values with different currencies, you need to convert them first. Same if you want to compare them: if all you have is an amount, you can’t make an accurate comparison. **Amount and currency can’t go without one another.**

### Floating point math is inacurrate

Some languages have come up with their own solutions like the `BigDecimal` type in Java or the `decimal` type in C#. JavaScript only has the `Number` type, which can be used as an integer or a [double precision float][wiki:ieee754]. Because it’s a binary representation of a base 10 system, you end up with inaccurate results when you try to do math.

```js
0.1 + 0.2 // returns 0.30000000000000004 😧
```

**Using floats to store monetary values is a bad idea.** As you calculate more values, the imperceptible precision errors lead to larger gaps. This inevitably ends up causing rounding issues.

### Money needs specific domain logic

Sometimes you need to split money, but **regular math operations like percentages or division can’t cut it without adding or losing pennies**.

Imagine you need to bill $999.99 with a 50% downpayment. Half is $499.995, but you can’t split a penny so you’ll likely round the result to $500. Problem is, as you charge the second half, you end up with the same result and charge a penny extra.

Instead of only relying on basic math to handle money, you need specific techniques that take the nature of the entity you're manipulating into account.

## How does Dinero.js work?

Dinero.js follows [Martin Fowler’s money pattern and more][martinfowler:eaa:money]. It was designed to be immutable and chainable. It supports global settings, has extended formatting options and provides native internationalization support.

### Why immutable?

An immutable library is safer and more predictable. Mutable operations and reference copies are the sources of many bugs. Opting for immutability avoids them altogether.

**With Dinero.js, you can perform calculations without worrying about altering original instances.** In the following Vue.js example, price won’t be altered when priceWithTax is called. If the instance was mutable, it would.

```js
const vm = new Vue({
  data: {
    price: Dinero({ amount: 500 })
  },
  computed: {
    priceWithTax() {
      return this.price.add(this.price.percentage(10))
    }
  }
})
```

### Chainability

Good developers strive to make their code more concise and easier to read. When you want to successively perform several operations on a single object, chaining provides an elegant notation and concise syntax.

```js
Dinero({ amount: 500 })
  .add(Dinero({ amount: 200 }))
  .multiply(4)
  .setLocale('fr-FR')
  .toFormat() // returns "28,00 US$"
```

### Global settings

When you’re handling lots of monetary values, chances are you want some of them to share some attributes. If you’re making a website in German, you’ll likely want to show amounts with the German currency format.

This is where global settings come in handy. Instead of passing them to every instance, you can declare options that will apply to all new objects.

```js
Dinero.globalLocale = 'de-DE'
Dinero({ amount: 500 }).toFormat() // returns "5,00 $"
```

### Native Internationalization support

Traditionally, libraries use locale files for internationalization. If you’re exhaustive, **they tend to make libraries much heavier**.

Locale files are also hard to maintain. The Internationalization API is native and [pretty well supported][caniuse:intl]. Unless you have to work with outdated and/or marginal browsers, `toFormat` is safe to use.

### Formatting

An object is great to store data, but not so helpful when it comes to displaying it. Dinero.js comes with various formatting methods, including `toFormat`. It provides intuitive and concise syntactic sugar over `Number.prototype.toLocaleString`. Pair it with `setLocale` and **you’ll be able to display any Dinero object into the proper format, in any language**. This is particularly helpful for multi-lingual e-commerce websites.

## Why should I use Dinero.js?

Dinero.js is a **modern, reliable, fully tested solution that just works**. The library is lightweight and you can use it in any JavaScript environment.

[npm:dinero]: https://www.npmjs.com/dinero.js

[wiki:ieee754]: https://en.wikipedia.org/wiki/IEEE_754
[martinfowler:eaa:money]: https://martinfowler.com/eaaCatalog/money.html
[caniuse:intl]: https://caniuse.com/#feat=internationalization

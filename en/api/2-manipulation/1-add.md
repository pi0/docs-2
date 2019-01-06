# Add

## Method signature

```
add(addend) → {Dinero}
```

## About this method

Returns a new Dinero object that represents the sum of this and another Dinero object.

When the Dinero objects have a different `precision`, they are first converted to the highest.

## Examples

### Add

```js
// returns a Dinero object with amount 600
Dinero({amount: 400 }).add(Dinero({ amount: 200 }))
```

### Add objects with different precisions

```js
// returns a Dinero object with amount 144545 and precision 4
Dinero({ amount: 400 }).add(Dinero({ amount: 104545, precision: 4 }))
```

## Parameters

| addend | `type: Dinero` `Required` |
|--------|---------------------------|
|        | The Dinero object to add. |

# Subtract

## Method signature

```
subtract(subtrahend) → {Dinero}
```

## About this method

Returns a new Dinero object that represents the difference of this and an other Dinero object.

When the Dinero objects have a different `precision`, they are first converted to the highest.

## Examples

### Subtract

```js
// returns a Dinero object with amount 200
Dinero({ amount: 400 }).subtract(Dinero({ amount: 200 }))
```

### Subtract objects with different precisions

```js
// returns a Dinero object with amount 64545 and precision 4
Dinero({ amount: 104545, precision: 4 }).subtract(Dinero({ amount: 400 }))
```

## Parameters

| subtrahend | `type: Dinero` `Required`      |
|------------|--------------------------------|
|            | The Dinero object to subtract. |

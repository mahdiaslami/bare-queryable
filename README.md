Query on array
==============

bare-queryable help you to query on an array of objects as SQL way.

In the usual way, you need to create a callback method for javascript array helpers like filter() and etc, But here you only do what you need.

Introduction
------------

```javascript
import { query } from 'query'

const users = [
  { id: 1, name: 'bare' },
  { id: 1, name: 'bare' },
]

const result = 
  query(users)
    where('name').contain('re')
    .get()
```

APIs
----

### Select

- #### _get()_

Returns query result.

```javascript
query([...]).get()

```

### Limit

```javascript
query([...]).first()

```

- #### _first()_

Returns first item of query result.

- #### _last()_

Returns last item of query result.

- #### _count()_

Returns count of items in query result.

### Where

```javascript
query([...])
  .where('id').equal(1)
  .get()
```

`column` parameter can be nested, for example:

```javascript
query([...])
  .where('prop.id').equal(1)
  .get()
```

- #### _where(column).equal(value)_

Filters the array so that the column value is exactly equal to the desired value. We use the `===` operator for this comparison.

- #### _where(column).notEqual(value)_

Filters the array so that the column value is not equal to the desired value. We use the `!==` operator for this comparison.

- #### _where(column).above(value)_

Filters the array so that the column value is greater than the desired value.

- #### _where(column).aboveOrEqual(value)_

Filters the array so that the column value is greater than or equal to the desired value.

- #### _where(column).below(value)_

Filters the array so that the column value is lower than the desired value.

- #### _where(column).belowOrEqual(value)_

Filters the array so that the column value is lower than or equal to the desired value.

- #### _where(column).contain(value)_

Filters the array so that the column value contains the desired value.

- #### _where(column).in(array)_

Filters the array so that the column value is inside the desired array.

```javascript
query([...])
  .where('id').in([1, 2, 3])
  .get()
```

- #### _andWhere(column)_

Chain conditions with `and` operator. both ways are ok.

```javascript
query([...])
  .where('id').equal(1)
  .andWhere('name').contain('foo')
  .get()

query([...])
  .where('id').equal(1)
  .where('name').contain('foo')
  .get()
```

- #### _orWhere(column)_

Chain conditions with `or` operator.

```javascript
query([...])
  .where('id').equal(1)
  .orWhere('id').above(10)
  .get()
```

- #### _Compare two columns_

If you want to compare two columns you can use the `.col` attribute.

```javascript
query([...])
  .where('name').col.notEqual('family')
  .get()
```

### Order by

Sorts columns ascending or descending.

```javascript
import { NUMBER_COMPARATOR, STRING_COMPARATOR, DATE_COMPARATOR } from 'bare-queryable'

query([...])
  .orderBy('id', NUMBER_COMPARATOR).asc()
  .orderBy('name', STRING_COMPARATOR).desc()
  .orderBy('born_at', DATE_COMPARATOR).desc()
  .get()
```

`column` parameter can be nested, for example:

```javascript
query([...])
  .order('prop.id').equal(1)
  .get()
```

- #### _DATE_COMPARATOR_

A callback that can compare two Dates.

- #### _STRING_COMPARATOR_

A callback that can compare two strings.

- #### _NUMBER_COMPARATOR_

A callback that can compare two numbers.

Query on array
==============

bare-queryable help you to query on a array of objects 
as SQL way.

In usual way,  you need to create a callback methods
for Javascript array helpers like filter() and etc.
But here you only do what you need.

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

#### get()

Returns query result.

```javascript
query([...]).get()
```

### Limit

```javascript
query([...]).first()
```

#### first()

Returns first item of query result.

#### last()

Returns last item of query result.

### Where

```javascript
query([...])
  .where('id').equal(1)
  .get()
```

#### where(column).equal(value)

Filters the array so that the specified column is exactly equal to the desired value.

#### where(column).above(value)

Filters the array so that the specified column is greater than the desired value.

#### where(column).aboveOrEqual(value)

Filters the array so that the specified column is greater than or equal to the desired value.

#### where(column).below(value)

Filters the array so that the specified column is lower than the desired value.

#### where(column).belowOrEqual(value)

Filters the array so that the specified column is lower than or equal to the desired value.

#### where(column).contain(value)

Filters the array so that the specified column is contain the desired value.

#### where(column).in(array)

Filters the array so that the specified column is inside the desired array.

```javascript
query([...])
  .where('id').in([1, 2, 3])
  .get()
```
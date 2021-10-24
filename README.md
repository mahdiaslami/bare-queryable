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

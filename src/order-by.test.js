import query from './query.js'
import { NUMBER_COMPARATOR, STRING_COMPARATOR, DATE_COMPARATOR } from './comparators.js'
import {
    users,
} from './fake.js'

test('sort a numeric column', () => {
    const result = query(users)
        .orderBy('intval', NUMBER_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[1], users[3], users[2], users[0]])
})

test('sort a str column', () => {
    const result = query(users)
        .orderBy('strval', STRING_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[1], users[3], users[2], users[0]])
})

test('sort a date column', () => {
    const result = query(users)
        .orderBy('dateval', DATE_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[1], users[3], users[2], users[0]])
})

test('sort a column descending', () => {
    const result = query(users)
        .orderBy('dateval', DATE_COMPARATOR).desc()
        .get()

    expect(result).toEqual([users[0], users[2], users[3], users[1]])
})

test('sort two column', () => {
    const result = query(users)
        .orderBy('strval2', STRING_COMPARATOR).asc()
        .orderBy('intval', NUMBER_COMPARATOR)
        .desc()
        .get()

    expect(result).toEqual([users[3], users[1], users[0], users[2]])
})

test('use nested key in order by', () => {
    const result = query(users)
        .orderBy('nestedVal.age', NUMBER_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[0], users[2], users[1], users[3]])
})

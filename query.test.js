import query from './query.js'
import { NUMBER_COMPARATOR, STRING_COMPARATOR, DATE_COMPARATOR } from './comparators.js'
import {
    users, children,
} from './fake.js'

test('get all items', () => {
    const result = query(users).get()

    expect(result).toEqual(users)
})

test('get first item', () => {
    const result = query(users).first()

    expect(result).toEqual(users[0])
})

test('get last item', () => {
    const result = query(users).last()

    expect(result).toEqual(users[3])
})

test('get count of items', () => {
    const result = query(users).count()

    expect(result).toBe(users.length)
})

test('order by a numeric column', () => {
    const result = query(users)
        .orderBy('intval', NUMBER_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[1], users[3], users[2], users[0]])
})

test('order by a str column', () => {
    const result = query(users)
        .orderBy('strval', STRING_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[1], users[3], users[2], users[0]])
})

test('order by a date column', () => {
    const result = query(users)
        .orderBy('dateval', DATE_COMPARATOR).asc()
        .get()

    expect(result).toEqual([users[1], users[3], users[2], users[0]])
})

test('order by a column descending', () => {
    const result = query(users)
        .orderBy('dateval', DATE_COMPARATOR).desc()
        .get()

    expect(result).toEqual([users[0], users[2], users[3], users[1]])
})

test('order by two column', () => {
    const result = query(users)
        .orderBy('strval2', STRING_COMPARATOR).asc()
        .orderBy('intval', NUMBER_COMPARATOR)
        .desc()
        .get()

    expect(result).toEqual([users[3], users[1], users[0], users[2]])
})

test('cross join two arrays', () => {
    const result = query(users).crossJoin(children).get()

    const expectedResult = []

    users.forEach(
        (row) => children.forEach(
            (row2) => expectedResult.push({
                ...row,
                ...row2,
            }),
        ),
    )

    expect(result).toEqual(
        expectedResult,
    )
})

import query from './query.js'
import { NUMBER_COMPARATOR, STRING_COMPARATOR, DATE_COMPARATOR } from './comparators.js'
import {
    users, data2,
} from './fake.js'

test('get all users', () => {
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

test('where equal', () => {
    const result = query(users).where('id').equal(2).get()

    expect(result).toEqual([users[2]])
})

test('where not equal', () => {
    const result = query(users).where('id').notEqual(2).get()

    expect(result).toEqual([users[0], users[1], users[3]])
})

test('where above', () => {
    const result = query(users)
        .where('id').above(2)
        .get()

    expect(result).toEqual([users[3]])
})

test('where above or equal', () => {
    const result = query(users)
        .where('id').aboveOrEqual(2)
        .get()

    expect(result).toEqual([users[2], users[3]])
})

test('where below', () => {
    const result = query(users)
        .where('id').below(2)
        .get()

    expect(result).toEqual([users[0], users[1]])
})

test('where below or equal', () => {
    const result = query(users)
        .where('id').belowOrEqual(1)
        .get()

    expect(result).toEqual([users[0], users[1]])
})

test('where in', () => {
    const result = query(users)
        .where('id').in([1, 3])
        .get()

    expect(result).toEqual([users[1], users[3]])
})

test('where contain', () => {
    const result = query(users)
        .where('name').contain('b')
        .get()

    expect(result).toEqual([users[1]])
})

test('and two conditions', () => {
    const result = query(users)
        .where('id').equal(1)
        .andWhere('id')
        .above(2)
        .get()

    expect(result).toEqual([])
})

test('where() can and conditions', () => {
    const result = query(users)
        .where('id').equal(1)
        .where('id')
        .above(2)
        .get()

    expect(result).toEqual([])
})

test('or two conditions', () => {
    const result = query(users)
        .where('id').equal(1)
        .orWhere('id')
        .above(2)
        .get()

    expect(result).toEqual([users[1], users[3]])
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

test('prevent duplicate item that staisfy two or conditions', () => {
    const result = query(users)
        .where('id').above(1)
        .orWhere('id')
        .equal(2)
        .get()

    expect(result).toEqual([users[2], users[3]])
})

test('cross join two arrays', () => {
    const result = query(users).crossJoin(data2).get()

    const expectedResult = []

    users.forEach(
        (row) => data2.forEach(
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

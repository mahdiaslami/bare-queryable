import query from './query.js'
import {
    users, parents,
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

test('cross join two arrays', () => {
    const result = query(users).crossJoin(parents).get()

    const expectedResult = []

    users.forEach(
        (row) => parents.forEach(
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

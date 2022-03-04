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

    const expectedResult = [
        { ...users[0], ...parents[0] },
        { ...users[0], ...parents[1] },
        { ...users[1], ...parents[0] },
        { ...users[1], ...parents[1] },
        { ...users[2], ...parents[0] },
        { ...users[2], ...parents[1] },
        { ...users[3], ...parents[0] },
        { ...users[3], ...parents[1] },
    ]

    expect(result).toEqual(
        expectedResult,
    )
})

test('inner join two arrays on two column', () => {
    const result = query(users)
        .join(parents).on('id').equal('parent_id')
        .get()

    const expectedResult = [
        { ...users[0], ...parents[0] },
        { ...users[1], ...parents[0] },
        { ...users[2], ...parents[1] },
    ]

    expect(result).toEqual(
        expectedResult,
    )
})

import query from './query.js'
import {
    users, parents,
} from './fake.js'

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

test('inner join two arrays', () => {
    const result = query(users)
        .join(parents).on('parent_id').col.equal('id')
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

test('innerJoin helper is same as join', () => {
    const result = query(users)
        .innerJoin(parents).on('parent_id').col.equal('id')
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

test('left join two arrays', () => {
    const result = query(users)
        .leftJoin(parents).on('parent_id').col.equal('id')
        .get()

    const expectedResult = [
        { ...users[0], ...parents[0] },
        { ...users[1], ...parents[0] },
        { ...users[2], ...parents[1] },
        { ...users[3] },
    ]

    expect(result).toEqual(
        expectedResult,
    )
})

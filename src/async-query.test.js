import query from './async-query.js'
import { NUMBER_COMPARATOR, STRING_COMPARATOR } from './comparators.js'
import { users } from './fake.js'

const promise = new Promise((resolve) => resolve(users))

test('get all users', () => {
    expect.assertions(1)

    query(promise).get().then((result) => {
        expect(result).toEqual(users)
    })
})

test('get first item', () => {
    expect.assertions(1)

    query(promise).first().then((result) => {
        expect(result).toEqual(users[0])
    })
})

test('get last item', () => {
    expect.assertions(1)

    query(promise).last().then((result) => {
        expect(result).toEqual(users[3])
    })
})

test('get count of items', () => {
    expect.assertions(1)

    query(promise).count().then((result) => {
        expect(result).toEqual(users.length)
    })
})

test('query with condition', () => {
    expect.assertions(1)

    query(promise)
        .where('id').equal(0)
        .get()
        .then((result) => {
            expect(result).toEqual([users[0]])
        })
})

test('order by two column', () => {
    expect.assertions(1)

    query(promise)
        .orderBy('strval2', STRING_COMPARATOR).asc()
        .orderBy('intval', NUMBER_COMPARATOR)
        .desc()
        .get()
        .then((result) => {
            expect(result).toEqual([users[3], users[1], users[0], users[2]])
        })
})

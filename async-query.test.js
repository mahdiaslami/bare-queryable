import query from './async-query'
import { NUMBER_COMPARATOR, STRING_COMPARATOR } from './query'
import { data } from './fake.js'

const promise = new Promise((resolve) => resolve(data))

test('get all data', () => {
    expect.assertions(1)

    query(promise).get().then(result => {
        expect(result).toEqual(data)
    })

})

test('get first item', () => {
    expect.assertions(1)

    query(promise).first().then(result => {
        expect(result).toEqual(data[0])
    })
})

test('get last item', () => {
    expect.assertions(1)

    query(promise).last().then(result => {
        expect(result).toEqual(data[3])
    })
})

test('query with condition', () => {
    expect.assertions(1)

    query(promise)
        .where('id').equal(0)
        .get().then(result => {
            expect(result).toEqual([data[0]])
        })
})

test('order by two column', () => {
    expect.assertions(1)

    query(promise)
        .orderBy('strval2', STRING_COMPARATOR).asc()
        .orderBy('intval', NUMBER_COMPARATOR).desc()
        .get().then(result => {
            expect(result).toEqual([data[3], data[1], data[0], data[2]])
        })
})
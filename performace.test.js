/* eslint-disable newline-per-chained-call */
import { query } from './index.js'
import { DATE_COMPARATOR, NUMBER_COMPARATOR, STRING_COMPARATOR } from './src/comparators.js'

describe('query on 10000 object', () => {
    test('4 where conditions should take less then 50ms', () => {
        const array = factory(10000)

        const start = now()
        query(array)
            .where('id').above(50)
            .where('id').below(9950)
            .orWhere('id').in([2, 3, 5, 7])
            .orWhere('name').contain(6)
            .get()

        const end = now()

        expect(end - start).toBeLessThan(50)
    })

    test('4 order by should take less than 100ms', () => {
        const array = factory(10000)

        const start = now()
        query(array)
            .orderBy('age', NUMBER_COMPARATOR).asc()
            .orderBy('name', STRING_COMPARATOR).asc()
            .orderBy('created_at', DATE_COMPARATOR).asc()
            .orderBy('id', STRING_COMPARATOR).asc()
            .get()
        const end = now()

        expect(end - start).toBeLessThan(100)
    })
})

function factory(count) {
    const array = []

    for (let i = 1; i <= count; i++) {
        array.push({
            id: i,
            name: hash(),
            age: rand(50),
            created_at: now(),
        })
    }

    return array
}

function rand(max) {
    return Math.floor(Math.random() * max)
}

function now() {
    return (new Date()).getTime()
}

function hash(length = 5) {
    return (Math.random() + 1).toString(36).substring(length)
}

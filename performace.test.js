import query from './query.js'

test('query on 10000 obj be less than 50ms', () => {
    const array = factory(10000)

    const start = now()
    query(array)
        .where('id')
        .above(50)
        .where('id')
        .below(9950)
        .orWhere('id')
        .in([2, 3, 5, 7])
        .where('name')
        .contain(6)
        .get()

    const end = now()

    expect(end - start).toBeLessThan(50)
})

export function factory(count) {
    const array = []

    for (let i = 1; i <= count; i++) {
        array.push({
            id: i,
            name: hash(),
        })
    }

    return array
}

export function now() {
    return (new Date()).getTime()
}

export function hash(length = 5) {
    return (Math.random() + 1).toString(36).substring(length)
}

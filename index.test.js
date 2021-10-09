require('jest')

const query = require('./index.js')

const data = [
    {
        id: 0,
        name: 'aaaa'
    },
    {
        id: 1,
        name: 'abaa'
    },
    {
        id: 2,
        name: 'aaca'
    },
    {
        id: 3,
        name: 'aaad'
    }
]

test('get all data', () => {
    const result = query(data).get()

    expect(result).toEqual(data)
})

test('where equal', () => {
    const result = query(data).where('id').equal(2).get()

    expect(result).toEqual([data[2]]);
})

test('where above', () => {
    const result = query(data)
        .where('id').above(2)
        .get()

    expect(result).toEqual([data[3]])
})

test('where below', () => {
    const result = query(data)
        .where('id').below(2)
        .get()

    expect(result).toEqual([data[0], data[1]])
})

test('where in', () => {
    const result = query(data)
        .where('id').in([1, 3])
        .get()

    expect(result).toEqual([data[1], data[3]])
})

test('where contain', () => {
    const result = query(data)
        .where('name').contain('b')
        .get()

    expect(result).toEqual([data[1]])
})

test('and two conditions', () => {
    const result = query(data)
        .where('id').equal(1)
        .where('id').above(2)
        .get()

    expect(result).toEqual([])
})

test('or two conditions', () => {
    const result = query(data)
        .where('id').equal(1)
        .orWhere('id').above(2)
        .get()

    expect(result).toEqual([data[1], data[3]])
})

test('prevent duplicate item that staisfy two or conditions', () => {
    const result = query(data)
        .where('id').above(1)
        .orWhere('id').equal(2)
        .get()

    expect(result).toEqual([data[2], data[3]])
})